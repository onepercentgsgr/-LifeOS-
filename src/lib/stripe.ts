import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2025-01-27.acacia' as any,
})

export const PLANS = {
  single: {
    name: '1 Agente',
    price: 6.99,
    priceId: process.env.STRIPE_PRICE_SINGLE_MONTHLY!,
    description: 'Agente de Finanzas',
    features: ['Tracking de gastos inteligente', 'Reportes mensuales', 'Alertas de presupuesto'],
  },
  bundle: {
    name: 'Life OS Bundle',
    price: 14.99,
    priceId: process.env.STRIPE_PRICE_BUNDLE_MONTHLY!,
    description: 'Finanzas + Gym + Nutrición + Productividad',
    features: [
      'Todo del plan single',
      'Agente de Gym personalizado',
      'Agente de Nutrición',
      'Agente de Productividad y Hábitos',
      'Sinergia entre agentes',
      'Reportes cruzados',
    ],
  },
  bundle_annual: {
    name: 'Life OS Anual',
    price: 129,
    priceId: process.env.STRIPE_PRICE_BUNDLE_ANNUAL!,
    description: 'Los 4 agentes — 1 año (ahorrás $50)',
    features: [
      'Todo del Bundle mensual',
      'Ahorro de $50 al año',
      'Acceso prioritario a novedades',
    ],
  },
} as const
