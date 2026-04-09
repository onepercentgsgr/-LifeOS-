import { NextRequest, NextResponse } from 'next/server'

// POST /api/checkout
// Body: { plan: 'single' | 'bundle' | 'bundle_annual', email: string, referralCode?: string }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, email, referralCode, country = 'Argentina' } = body

    if (!plan || !email) {
      return NextResponse.json({ error: 'Faltan plan o email' }, { status: 400 })
    }

    // Lógica multi-moneda / multi-país:
    // Si es Argentina -> MercadoPago (Cobro en Pesos / ARS)
    // Si es Exterior -> Stripe (Cobro en Dólares / USD)
    const isArgentina = country.toLowerCase() === 'argentina'

    /*
    const { stripe } = await import('@/lib/stripe')
    const { PLANS } = await import('@/lib/stripe')

    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    if (isArgentina) {
      // 1. Crear preferencia en MercadoPago
      // const preference = new Preference(mercadopago_client);
      // const response = await preference.create({ body: { items: [...], auto_return: 'approved' } });
      // return NextResponse.json({ url: response.init_point })
    } else {
      // 2. Stripe Checkout (Resto del mundo)
      const session = await stripe.checkout.sessions.create({
        mode: plan === 'bundle_annual' ? 'payment' : 'subscription',
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [{ price: planConfig.priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#precios`,
        metadata: { referral_code: referralCode || '' },
        subscription_data: plan !== 'bundle_annual' ? {
          trial_period_days: 14,
          metadata: { referral_code: referralCode || '' },
        } : undefined,
      })
      return NextResponse.json({ url: session.url })
    }
    */

    // Mock response
    if (isArgentina) {
      return NextResponse.json({
        url: `https://mpago.la/mock?plan=${plan}&email=${email}&ref=${referralCode || 'none'}`,
        message: 'Checkout MercadoPago (ARS) creado',
        provider: 'mercadopago',
        currency: 'ARS'
      })
    } else {
      return NextResponse.json({
        url: `https://checkout.stripe.com/mock?plan=${plan}&email=${email}&ref=${referralCode || 'none'}`,
        message: 'Checkout Stripe (USD) creado',
        provider: 'stripe',
        currency: 'USD'
      })
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
