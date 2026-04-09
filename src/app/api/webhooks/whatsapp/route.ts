import { NextRequest, NextResponse } from 'next/server'

// POST /api/webhooks/whatsapp
// Este es el webhook oficial que recibe los mensajes de Meta Cloud API
// Su único objetivo es encolar el mensaje rápído y devolver un 200 OK a Meta
// para evitar reintentos y bloqueos. Luego n8n procesará la tabla `message_queue`.

export async function POST(request: NextRequest) {
  try {
    const rawPayload = await request.json()

    // Validar si es un mensaje de WhatsApp (puede venir de distintos eventos)
    const entry = rawPayload.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const message = value?.messages?.[0]

    // Si no es un mensaje válido, ignorar y devolver 200 igual
    if (!message) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const whatsapp_message_id = message.id
    const sender_number = message.from

    // TODO: En producción usar Supabase
    /*
    const { supabaseAdmin } = await import('@/lib/supabase')
    const db = supabaseAdmin()

    // Encolar mensaje
    const { error } = await db.from('message_queue').insert({
      whatsapp_message_id,
      sender_number,
      raw_payload: rawPayload,
      status: 'pending'
    })

    if (error && error.code !== '23505') { // Ignorar duplicados
      console.error('Error encolando mensaje:', error)
      return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
    */

    console.log(`[WhatsApp Webhook] Mensaje encolado de ${sender_number}`)

    // RESPONDER RÁPIDO PARA QUE META NO CANCELE EL WEBHOOK
    return NextResponse.json({ status: 'queued' }, { status: 200 })
  } catch (error) {
    console.error('Error en webhook de WhatsApp:', error)
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }
}

// GET /api/webhooks/whatsapp
// Usado por Meta para verificar (Challenge) el webhook la primera vez
export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('hub.mode')
  const token = request.nextUrl.searchParams.get('hub.verify_token')
  const challenge = request.nextUrl.searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'tu_token_secreto'

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('Webhook de Meta verificado')
    return new NextResponse(challenge, { status: 200 })
  } else {
    return NextResponse.json({ error: 'Token inválido' }, { status: 403 })
  }
}
