import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/bot/verify?phone=+5491123456789
// n8n llama este endpoint para saber si el usuario puede usar el bot
// Retorna: { access: boolean, user: {...}, message: string | null }

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ error: 'Falta el parámetro phone' }, { status: 400 })
  }

  const db = supabaseAdmin()

  // Buscar usuario por número de WhatsApp
  const { data: user, error } = await db
    .from('users')
    .select('id, name, status, plan, trial_ends_at, monthly_message_count, monthly_limit')
    .eq('whatsapp_number', phone)
    .single()

  // Usuario no encontrado → ofrecerle activar Life OS
  if (error || !user) {
    return NextResponse.json({
      access: false,
      user: null,
      message: `¡Hola! 👋 No encontré tu cuenta de *Life OS*.\n\n¿Querés activar tu prueba gratis de 14 días? 🚀\n👉 https://lifeos.vercel.app/#precios`,
    })
  }

  // Verificar si el trial expiró
  const now = new Date()
  const trialExpired =
    user.status === 'trial' &&
    user.trial_ends_at &&
    new Date(user.trial_ends_at) < now

  if (trialExpired) {
    return NextResponse.json({
      access: false,
      user,
      message: `Hey ${user.name}! ⏰ Tu período de prueba expiró.\n\nElegí un plan para seguir usando los 4 agentes de *Life OS*:\n👉 https://lifeos.vercel.app/#precios`,
    })
  }

  // Pago fallido
  if (user.status === 'past_due') {
    return NextResponse.json({
      access: false,
      user,
      message: `Hey ${user.name}! 🚨 Hubo un problema con tu pago.\n\nActualizá tu método de pago para seguir usando *Life OS*:\n👉 https://lifeos.vercel.app/#precios`,
    })
  }

  // Suscripción cancelada
  if (user.status === 'cancelled') {
    return NextResponse.json({
      access: false,
      user,
      message: `Hola ${user.name} 👋 Tu suscripción está cancelada.\n\n¿Querés volver? Tenemos un plan especial para vos:\n👉 https://lifeos.vercel.app/#precios`,
    })
  }

  // Verificar cuota mensual de mensajes (Fair Use)
  const isOverQuota = (user.monthly_message_count ?? 0) >= (user.monthly_limit ?? 1000)

  if (isOverQuota) {
    return NextResponse.json({
      access: false,
      user,
      message: `Hey ${user.name}! 📊 Alcanzaste el límite de mensajes de este mes (${user.monthly_limit}).\n\nPodés esperar al 1° del próximo mes o contactarnos para ampliar tu plan.`,
    })
  }

  // ✅ Usuario activo con cuota disponible
  // Determinar agentes disponibles según plan
  const agents =
    user.plan === 'bundle' || user.plan === 'affiliate'
      ? ['finance', 'gym', 'nutrition', 'productivity']
      : ['finance'] // plan 'single' solo tiene finanzas

  // Incrementar contador de mensajes
  await db
    .from('users')
    .update({ monthly_message_count: (user.monthly_message_count ?? 0) + 1 })
    .eq('id', user.id)

  return NextResponse.json({
    access: true,
    user: {
      ...user,
      agents,
    },
    message: null,
  })
}
