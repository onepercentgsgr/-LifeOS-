import MercadoPagoConfig from 'mercadopago'

// Configuración central de MercadoPago
export const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 }
})

// Planes disponibles en ARS (actualizá los precios según tu estrategia)
export const MP_PLANS = {
  single: {
    title: 'Life OS — 1 Agente (Finanzas)',
    description: 'Agente Financiero IA en WhatsApp. 14 días gratis.',
    unit_price: 6990,       // ARS — equivalente a USD $6.99
    currency_id: 'ARS',
    id: 'single'
  },
  bundle: {
    title: 'Life OS Bundle — 4 Agentes',
    description: 'Los 4 agentes IA (Finanzas, Gym, Nutrición, Productividad). 14 días gratis.',
    unit_price: 14990,      // ARS — equivalente a USD $14.99
    currency_id: 'ARS',
    id: 'bundle'
  },
  bundle_annual: {
    title: 'Life OS Bundle Anual — 4 Agentes',
    description: 'Bundle completo con descuento anual. 14 días de garantía.',
    unit_price: 129000,     // ARS — equivalente a USD $129
    currency_id: 'ARS',
    id: 'bundle_annual'
  }
}
