import { NextRequest, NextResponse } from 'next/server'

// Esta API la llama n8n para verificar si un usuario tiene acceso al bot
// GET /api/bot/verify?phone=+5491123456789

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ error: 'Falta el parámetro phone' }, { status: 400 })
  }

  // EN PRODUCCION: Seleccionar contadores de mensajes
  // const { data: user } = await supabaseAdmin()
  //   .from('users')
  //   .select('id, name, status, plan, trial_ends_at, monthly_message_count, monthly_limit')
  //   .eq('whatsapp_number', phone)
  //   .single()

  // Mock response
  const mockUser = {
    id: 'usr_123',
    name: 'María González',
    status: 'active',
    plan: 'bundle',
    agents: ['finance', 'gym', 'nutrition', 'productivity'],
    monthly_message_count: 950,
    monthly_limit: 1000,
  }

  // Lógica de acceso:
  // - active → acceso completo según plan (filtrado por cuota)
  // - trial → acceso completo hasta trial_ends_at
  // - past_due → sin acceso, mandar link de pago
  // - cancelled → sin acceso, ofrecer comeback

  // Evaluación de Fair Use (Límites de mensajes)
  const isOverQuota = mockUser.monthly_message_count >= mockUser.monthly_limit;

  if ((mockUser.status === 'active' || mockUser.status === 'trial') && !isOverQuota) {
    return NextResponse.json({
      access: true,
      user: mockUser,
      message: null,
    })
  }

  if ((mockUser.status === 'active' || mockUser.status === 'trial') && isOverQuota) {
    return NextResponse.json({
      access: false,
      user: mockUser,
      message: `Hola ${mockUser.name}, alcanzaste el límite de ${mockUser.monthly_limit} mensajes permitidos este mes para asegurar la velocidad del sistema. Podés esperar al próximo mes o ampliar tu plan acá: https://lifeos.app/upgrade`,
    })
  }

  if (mockUser.status === 'past_due') {
    return NextResponse.json({
      access: false,
      user: mockUser,
      message: `Hey ${mockUser.name}! Parece que hubo un problema con tu último pago. Actualizá tu tarjeta acá para seguir usando Life OS: https://lifeos.app/billing`,
    })
  }

  return NextResponse.json({
    access: false,
    user: null,
    message: 'Este número no tiene una suscripción activa. Activá tu Life OS acá: https://lifeos.app',
  })
}
