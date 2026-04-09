'use client'

import { useState } from 'react'

const templates = [
  {
    id: 'comeback',
    name: '🔥 Volvé con descuento',
    message: 'Hey {nombre}! Te extrañamos en Life OS 🥺 Volvé con un 50% OFF en tu primer mes: {link}',
    target: 'Cancelados últimos 30 días',
    targetCount: 15,
  },
  {
    id: 'upgrade',
    name: '⬆️ Upgrade a Bundle',
    message: '¿Sabías que con el Bundle x3 tus agentes se conectan entre sí? 🧠 Por solo $8 más al mes tenés Finanzas + Gym + Nutrición trabajando juntos. Upgrade acá: {link}',
    target: 'Plan Single activos',
    targetCount: 42,
  },
  {
    id: 'trial_ending',
    name: '⏰ Trial por vencer',
    message: '{nombre}, tu prueba gratis de Life OS termina en 2 días! No pierdas tu historial y progreso. Activá tu plan acá: {link}',
    target: 'Trials que vencen en 3 días',
    targetCount: 8,
  },
  {
    id: 'referral',
    name: '🤝 Programa de referidos',
    message: '¿Te gusta Life OS? Compartí tu link y ganá el 50% de comisión por cada persona que invite. Registrate como afiliado: {link}',
    target: 'Activos hace +30 días',
    targetCount: 120,
  },
  {
    id: 'annual',
    name: '💎 Oferta Anual',
    message: 'PROMO 48HS: Pasate al plan anual y ahorrá $50 🔥 Son solo $129 por todo el año (3 agentes). Link exclusivo: {link}',
    target: 'Bundle mensual activos',
    targetCount: 89,
  },
]

const pastCampaigns = [
  { name: 'Comeback Marzo', sent: 12, opened: 9, converted: 3, revenue: 44.97, date: '2026-03-15' },
  { name: 'Upgrade Febrero', sent: 35, opened: 28, converted: 8, revenue: 63.92, date: '2026-02-20' },
  { name: 'Trial Push Enero', sent: 18, opened: 15, converted: 11, revenue: 164.89, date: '2026-01-25' },
]

export default function AdminCampaigns() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customMessage, setCustomMessage] = useState('')
  const [sending, setSending] = useState(false)

  const selected = templates.find(t => t.id === selectedTemplate)

  const handleSend = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSelectedTemplate(null)
      alert(`✅ Campaña enviada a ${selected?.targetCount} usuarios!`)
    }, 2000)
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Campañas</h1>
          <p className="admin-subtitle">Enviar mensajes masivos por WhatsApp</p>
        </div>
      </div>

      {/* Templates */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Templates Listos</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {templates.map(t => (
          <div
            key={t.id}
            className="glass-card"
            style={{
              padding: '24px',
              cursor: 'pointer',
              borderColor: selectedTemplate === t.id ? 'var(--primary)' : undefined,
              boxShadow: selectedTemplate === t.id ? 'var(--shadow-glow)' : undefined,
            }}
            onClick={() => {
              setSelectedTemplate(t.id)
              setCustomMessage(t.message)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontWeight: 700 }}>{t.name}</h4>
              <span style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(0, 210, 255, 0.12)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--accent)',
              }}>
                {t.targetCount} usuarios
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '8px' }}>
              {t.message}
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: {t.target}</span>
          </div>
        ))}
      </div>

      {/* Editor */}
      {selectedTemplate && (
        <div className="glass-card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
            ✏️ Editar y Enviar: {selected?.name}
          </h3>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Variables: {'{nombre}'}, {'{link}'}, {'{plan}'}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedTemplate(null)}>
                Cancelar
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSend}
                disabled={sending}
              >
                {sending ? '⏳ Enviando...' : `📤 Enviar a ${selected?.targetCount} usuarios`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Past Campaigns */}
      <div className="glass-card data-table-wrapper">
        <div className="data-table-header">
          <span className="data-table-title">Campañas Anteriores</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaña</th>
              <th>Enviados</th>
              <th>Abiertos</th>
              <th>Conversión</th>
              <th>Revenue</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pastCampaigns.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.sent}</td>
                <td>
                  {c.opened}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {' '}({Math.round(c.opened / c.sent * 100)}%)
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
                    {c.converted} ({Math.round(c.converted / c.sent * 100)}%)
                  </span>
                </td>
                <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>${c.revenue.toFixed(2)}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
