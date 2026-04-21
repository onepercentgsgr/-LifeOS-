import { NextRequest, NextResponse } from 'next/server'
import { mp, MP_PLANS } from '@/lib/mercadopago'
import { Preference } from 'mercadopago'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/checkout
// Body: { plan: 'single' | 'bundle' | 'bundle_annual', phone: string, name?: string, referralCode?: string }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, phone, name = 'Usuario', referralCode, email = '' } = body

    if (!plan || !phone) {
      return NextResponse.json({ error: 'Faltan plan o teléfono' }, { status: 400 })
    }

    const planConfig = MP_PLANS[plan as keyof typeof MP_PLANS]
    if (!planConfig) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const db = supabaseAdmin()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // 1. Crear preferencia de pago en MercadoPago
    const preference = new Preference(mp)
    const response = await preference.create({
      body: {
        items: [
          {
            id: planConfig.id,
            title: planConfig.title,
            description: planConfig.description,
            unit_price: planConfig.unit_price,
            quantity: 1,
            currency_id: planConfig.currency_id,
          }
        ],
        payer: {
          name,
          email: email || `${phone.replace('+', '')}@lifeos.app`,
          phone: { number: phone }
        },
        back_urls: {
          success: `${appUrl}/success?plan=${plan}&phone=${encodeURIComponent(phone)}&ref=${referralCode || ''}`,
          failure: `${appUrl}/#precios`,
          pending: `${appUrl}/pending`
        },
        auto_return: 'approved',
        external_reference: JSON.stringify({ plan, phone, referralCode: referralCode || '' }),
        metadata: { plan, phone, referral_code: referralCode || '' },
        // Período de prueba gratis de 14 días (válido con suscripciones recurrentes)
        // Para suscripciones recurrentes se usa /preapproval — ver webhook-mp para el flujo
      }
    })

    // 2. Pre-registrar usuario en Supabase con estado 'trial'
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

    const { data: existingUser } = await db
      .from('users')
      .select('id')
      .eq('whatsapp_number', phone)
      .single()

    if (!existingUser) {
      await db.from('users').insert({
        whatsapp_number: phone,
        name,
        email: email || null,
        status: 'trial',
        plan,
        trial_ends_at: trialEndsAt,
        monthly_message_count: 0,
        monthly_limit: 1000,
      })
    }

    // 3. Si hay referralCode, vincularlo al usuario apenas llega
    if (referralCode) {
      const { data: affiliate } = await db
        .from('affiliates')
        .select('id')
        .eq('referral_code', referralCode.toUpperCase())
        .single()

      if (affiliate && existingUser) {
        await db.from('users')
          .update({ affiliate_id: affiliate.id })
          .eq('whatsapp_number', phone)
      }
    }

    return NextResponse.json({
      url: response.init_point,
      preference_id: response.id,
      provider: 'mercadopago',
      currency: 'ARS',
      plan,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 })
  }
}
