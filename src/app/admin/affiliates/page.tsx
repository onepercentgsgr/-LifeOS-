'use client'

import { useState } from 'react'

const mockAffiliates = [
  { id: 1, name: 'Roberto Sánchez', email: 'roberto@gmail.com', code: 'ROBERTO50', referrals: 12, earned: 1079.28, paid: 800, pending: 279.28, status: 'active' as const, joined: '2026-01-10' },
  { id: 2, name: 'Valentina Cruz', email: 'vale@gmail.com', code: 'VALE50', referrals: 8, earned: 719.52, paid: 500, pending: 219.52, status: 'active' as const, joined: '2026-02-01' },
  { id: 3, name: 'Mateo Ruiz', email: 'mateo@gmail.com', code: 'MATEO50', referrals: 5, earned: 374.75, paid: 374.75, pending: 0, status: 'active' as const, joined: '2026-02-15' },
  { id: 4, name: 'Camila Herrera', email: 'camila@gmail.com', code: 'CAMI50', referrals: 2, earned: 149.90, paid: 0, pending: 149.90, status: 'active' as const, joined: '2026-03-20' },
  { id: 5, name: 'Lucas Gómez', email: 'lucas@gmail.com', code: 'LUCAS50', referrals: 0, earned: 0, paid: 0, pending: 0, status: 'inactive' as const, joined: '2026-03-25' },
]

const mockCommissions = [
  { id: 1, affiliate: 'Roberto Sánchez', user: 'María González', amount: 7.50, status: 'pending' as const, date: '2026-04-01' },
  { id: 2, affiliate: 'Valentina Cruz', user: 'Pedro García', amount: 7.50, status: 'pending' as const, date: '2026-04-03' },
  { id: 3, affiliate: 'Roberto Sánchez', user: 'Sofía Torres', amount: 3.50, status: 'paid' as const, date: '2026-03-28' },
  { id: 4, affiliate: 'Mateo Ruiz', user: 'Diego Fernández', amount: 7.50, status: 'paid' as const, date: '2026-03-25' },
]

export default function AdminAffiliates() {
  const [tab, setTab] = useState<'affiliates' | 'commissions'>('affiliates')

  const totalEarned = mockAffiliates.reduce((s, a) => s + a.earned, 0)
  const totalPending = mockAffiliates.reduce((s, a) => s + a.pending, 0)
  const totalReferrals = mockAffiliates.reduce((s, a) => s + a.referrals, 0)

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Afiliados</h1>
          <p className="admin-subtitle">Programa de referidos Life OS</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Crear Afiliado</button>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Afiliados</span>
            <div className="stat-card-icon" style={{ background: 'rgba(108, 92, 231, 0.15)' }}>🤝</div>
          </div>
          <div className="stat-card-value">{mockAffiliates.length}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Referidos Totales</span>
            <div className="stat-card-icon" style={{ background: 'rgba(0, 230, 118, 0.15)' }}>👥</div>
          </div>
          <div className="stat-card-value">{totalReferrals}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Comisiones Pagadas</span>
            <div className="stat-card-icon" style={{ background: 'rgba(0, 210, 255, 0.15)' }}>✅</div>
          </div>
          <div className="stat-card-value">${(totalEarned - totalPending).toFixed(0)}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Pendiente de Pago</span>
            <div className="stat-card-icon" style={{ background: 'rgba(255, 145, 0, 0.15)' }}>⏳</div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--accent-orange)' }}>${totalPending.toFixed(0)}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          className={`btn btn-sm ${tab === 'affiliates' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('affiliates')}
        >
          Afiliados
        </button>
        <button
          className={`btn btn-sm ${tab === 'commissions' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('commissions')}
        >
          Comisiones
        </button>
      </div>

      {tab === 'affiliates' ? (
        <div className="glass-card data-table-wrapper">
          <div className="data-table-header">
            <span className="data-table-title">Todos los afiliados</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>Referidos</th>
                <th>Ganancia Total</th>
                <th>Pendiente</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockAffiliates.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{a.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email}</div>
                  </td>
                  <td>
                    <code style={{ background: 'var(--bg-primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                      {a.code}
                    </code>
                  </td>
                  <td style={{ fontWeight: 600 }}>{a.referrals}</td>
                  <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>${a.earned.toFixed(2)}</td>
                  <td style={{ color: a.pending > 0 ? 'var(--accent-orange)' : 'var(--text-muted)', fontWeight: 600 }}>
                    ${a.pending.toFixed(2)}
                  </td>
                  <td>
                    <span className={`status-badge ${a.status === 'active' ? 'active' : 'cancelled'}`}>
                      <span className="status-dot" />
                      {a.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    {a.pending > 0 && (
                      <button className="btn btn-primary btn-sm" style={{ padding: '6px 12px', fontSize: '0.7rem' }}>
                        💸 Pagar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-card data-table-wrapper">
          <div className="data-table-header">
            <span className="data-table-title">Historial de Comisiones</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Afiliado</th>
                <th>Usuario Referido</th>
                <th>Comisión</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {mockCommissions.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.affiliate}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.user}</td>
                  <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>${c.amount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${c.status}`}>
                      <span className="status-dot" />
                      {c.status === 'paid' ? 'Pagada' : 'Pendiente'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
