import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/webhooks/whatsapp
// Objetivo: recibir el mensaje, encolar en DB en <100ms, devolver 200 a Meta.
// n8n lee la tabla message_queue y procesa a su ritmo.

export async function POST(request: NextRequest) {
  try {
    const rawPayload = await request.json()

    const entry = rawPayload.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const message = value?.messages?.[0]

    // Si no es un mensaje (puede ser status update, etc.) ignorar silenciosamente
    if (!message) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const whatsapp_message_id = message.id
    const sender_number = message.from

    // Encolar en Supabase (operación ultra-rápida, async)
    const db = supabaseAdmin()
    const { error } = await db.from('message_queue').insert({
      whatsapp_message_id,
      sender_number,
      raw_payload: rawPayload,
      status: 'pending'
    })

    if (error && error.code !== '23505') {
      // 23505 = duplicate key (mensaje duplicado de Meta) → ignorar
      console.error('[WhatsApp Webhook] Error encolando:', error.message)
    }

    console.log(`[WhatsApp Webhook] ✅ Mensaje encolado de +${sender_number}`)

    // CRÍTICO: Responder 200 inmediato para que Meta no cancele el webhook
    return NextResponse.json({ status: 'queued' }, { status: 200 })

  } catch (error) {
    console.error('[WhatsApp Webhook] Error:', error)
    // Devolver 200 igual para evitar que Meta deshabilite el webhook
    return NextResponse.json({ status: 'error_queued' }, { status: 200 })
  }
}

// GET /api/webhooks/whatsapp
// Meta usa esto para verificar el webhook la primera vez (Challenge)
export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('hub.mode')
  const token = request.nextUrl.searchParams.get('hub.verify_token')
  const challenge = request.nextUrl.searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[WhatsApp Webhook] ✅ Verificación exitosa por Meta')
    return new NextResponse(challenge, { status: 200 })
  }

  console.warn('[WhatsApp Webhook] ❌ Token de verificación inválido')
  return NextResponse.json({ error: 'Token inválido' }, { status: 403 })
}
