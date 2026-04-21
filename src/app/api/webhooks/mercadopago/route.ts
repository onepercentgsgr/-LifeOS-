import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/webhooks/mercadopago
// MercadoPago avisa acá cuando ocurre un evento de pago
// Configurarlo en la app de MP: Tus Integraciones → Webhooks → https://tudominio/api/webhooks/mercadopago

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = supabaseAdmin()

    const type = body.type // 'payment' | 'subscription_preapproval' | etc.
    const action = body.action // 'payment.created' | 'payment.updated' | etc.
    const dataId = body.data?.id

    console.log(`[MP Webhook] type=${type} action=${action} id=${dataId}`)

    // ─── PAGO ÚNICO O PRIMER PAGO ──────────────────────────────────────────────
    if (type === 'payment') {
      // Obtener detalles del pago desde la API de MP
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      })
      const payment = await mpRes.json()

      const status = payment.status // 'approved' | 'rejected' | 'pending'
      const externalRef = payment.external_reference
        ? JSON.parse(payment.external_reference)
        : null

      const phone = externalRef?.phone
      const planId = externalRef?.plan
      const referralCode = externalRef?.referralCode

      if (!phone || !planId) {
        console.warn('[MP Webhook] Sin teléfono o plan en external_reference')
        return NextResponse.json({ received: true })
      }

      if (status === 'approved') {
        // Activar usuario
        await db.from('users')
          .update({ status: 'active', plan: planId })
          .eq('whatsapp_number', phone)

        // Buscar usuario para comisiones
        const { data: user } = await db
          .from('users')
          .select('id, affiliate_id')
          .eq('whatsapp_number', phone)
          .single()

        // Si tiene afiliado, crear comisión (50%)
        if (user?.affiliate_id) {
          const planAmounts: Record<string, number> = {
            single: 6990,
            bundle: 14990,
            bundle_annual: 129000,
          }
          const totalAmount = planAmounts[planId] || 0
          const commission = totalAmount * 0.5

          await db.from('commissions').insert({
            affiliate_id: user.affiliate_id,
            referred_user_id: user.id,
            amount: commission,
            status: 'pending',
            stripe_payment_id: String(dataId), // reutilizamos columna para ID de MP
          })

          // Sumar al total ganado del afiliado
          await db.rpc('increment_affiliate_earnings', {
            affiliate_uuid: user.affiliate_id,
            earning_amount: commission,
          })
        }

        // Registrar mensaje en bot_messages (analytics)
        if (user) {
          await db.from('bot_messages').insert({
            user_id: user.id,
            agent_type: 'system',
            direction: 'in',
          })
        }

        console.log(`[MP Webhook] ✅ Pago aprobado para ${phone} — plan: ${planId}`)
      }

      if (status === 'rejected') {
        await db.from('users')
          .update({ status: 'past_due' })
          .eq('whatsapp_number', phone)
        console.log(`[MP Webhook] ❌ Pago rechazado para ${phone}`)
      }
    }

    // ─── SUSCRIPCIÓN RECURRENTE (Preapproval) ────────────────────────────────
    if (type === 'subscription_preapproval') {
      const mpRes = await fetch(`https://api.mercadopago.com/preapproval/${dataId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      })
      const subscription = await mpRes.json()
      const status = subscription.status // 'authorized' | 'cancelled' | 'paused'
      const phone = subscription.external_reference

      if (status === 'cancelled') {
        await db.from('users')
          .update({ status: 'cancelled' })
          .eq('whatsapp_number', phone)
        console.log(`[MP Webhook] 🚫 Suscripción cancelada para ${phone}`)
      }

      if (status === 'authorized') {
        await db.from('users')
          .update({ status: 'active' })
          .eq('whatsapp_number', phone)
        console.log(`[MP Webhook] ✅ Suscripción activada para ${phone}`)
      }
    }

    // MP requiere un 200 inmediato para no reenviar el evento
    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    console.error('[MP Webhook] Error:', error)
    // Devolvemos 200 igual para que MP no reintente en un bucle
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
