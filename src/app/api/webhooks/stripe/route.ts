import { NextRequest, NextResponse } from 'next/server'

// POST /api/webhooks/stripe
// Stripe manda eventos acá cuando pasa algo con un pago

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  // En producción:
  /*
  const { stripe } = await import('@/lib/stripe')
  const { supabaseAdmin } = await import('@/lib/supabase')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = supabaseAdmin()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const email = session.customer_email
      const referralCode = session.metadata?.referral_code

      // 1. Crear usuario en Supabase
      const { data: user } = await db.from('users').insert({
        email,
        status: 'trial',
        plan: 'bundle', // derivar del price
        stripe_customer_id: session.customer,
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      }).select().single()

      // 2. Si hay referralCode, crear comisión
      if (referralCode && user) {
        const { data: affiliate } = await db
          .from('affiliates')
          .select()
          .eq('referral_code', referralCode)
          .single()

        if (affiliate) {
          await db.from('users').update({ affiliate_id: affiliate.id }).eq('id', user.id)
        }
      }
      break
    }

    case 'invoice.paid': {
      const invoice = event.data.object
      const customerId = invoice.customer

      // Activar usuario
      await db.from('users')
        .update({ status: 'active' })
        .eq('stripe_customer_id', customerId)

      // Crear comisión para el afiliado
      const { data: user } = await db.from('users')
        .select('id, affiliate_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (user?.affiliate_id) {
        const amount = (invoice.amount_paid / 100) * 0.5 // 50% comisión
        await db.from('commissions').insert({
          affiliate_id: user.affiliate_id,
          referred_user_id: user.id,
          amount,
          status: 'pending',
          stripe_payment_id: invoice.id,
        })

        await db.from('affiliates')
          .update({ total_earned: db.rpc('increment', { x: amount }) })
          .eq('id', user.affiliate_id)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object
      await db.from('users')
        .update({ status: 'past_due' })
        .eq('stripe_customer_id', invoice.customer)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      await db.from('users')
        .update({ status: 'cancelled' })
        .eq('stripe_customer_id', subscription.customer)
      break
    }
  }
  */

  // Mock: log the event
  console.log('Stripe webhook received:', body.substring(0, 100))

  return NextResponse.json({ received: true })
}
