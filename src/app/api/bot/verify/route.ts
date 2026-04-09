import { NextRequest, NextResponse } from 'next/server'

// Esta API la llama n8n para verificar si un usuario tiene acceso al bot
// GET /api/bot/verify?phone=+5491123456789

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ error: 'Falta el parámetro phone' }, { status: 400 })
  }

  // En producción: consultar Supabase
  // const { data: user } = await supabaseAdmin()
  //   .from('users')
  //   .select('id, name, status, plan, trial_ends_at')
  //   .eq('whatsapp_number', phone)
  //   .single()

  // Mock response
  const mockUser = {
    id: 'usr_123',
    name: 'María González',
    status: 'active',
    plan: 'bundle',
    agents: ['finance', 'gym', 'nutrition'],
  }

  // Lógica de acceso:
  // - active → acceso completo según plan
  // - trial → acceso completo hasta trial_ends_at
  // - past_due → sin acceso, mandar link de pago
  // - cancelled → sin acceso, ofrecer comeback

  if (mockUser.status === 'active' || mockUser.status === 'trial') {
    return NextResponse.json({
      access: true,
      user: mockUser,
      message: null,
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
