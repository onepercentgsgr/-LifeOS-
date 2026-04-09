'use client'

import { useState } from 'react'

const mockUsers = [
  { id: 1, name: 'María González', whatsapp: '+54 9 11 2345-6789', email: 'maria@gmail.com', plan: 'bundle', status: 'active' as const, lastPayment: '2026-04-01', amount: 14.99, agentFav: 'finance', joined: '2026-01-15' },
  { id: 2, name: 'Juan Pérez', whatsapp: '+54 9 11 3456-7890', email: 'juan@gmail.com', plan: 'single', status: 'trial' as const, lastPayment: '-', amount: 0, agentFav: 'finance', joined: '2026-04-05' },
  { id: 3, name: 'Lucía Martínez', whatsapp: '+54 9 11 4567-8901', email: 'lucia@gmail.com', plan: 'bundle', status: 'active' as const, lastPayment: '2026-04-02', amount: 14.99, agentFav: 'gym', joined: '2026-02-10' },
  { id: 4, name: 'Carlos López', whatsapp: '+54 9 11 5678-9012', email: 'carlos@gmail.com', plan: 'single', status: 'past_due' as const, lastPayment: '2026-03-01', amount: 6.99, agentFav: 'finance', joined: '2026-03-01' },
  { id: 5, name: 'Ana Rodríguez', whatsapp: '+54 9 11 6789-0123', email: 'ana@gmail.com', plan: 'bundle', status: 'cancelled' as const, lastPayment: '2026-02-15', amount: 14.99, agentFav: 'nutrition', joined: '2025-12-20' },
  { id: 6, name: 'Pedro García', whatsapp: '+54 9 11 7890-1234', email: 'pedro@gmail.com', plan: 'bundle', status: 'active' as const, lastPayment: '2026-04-03', amount: 14.99, agentFav: 'gym', joined: '2026-01-05' },
  { id: 7, name: 'Sofía Torres', whatsapp: '+54 9 11 8901-2345', email: 'sofia@gmail.com', plan: 'single', status: 'active' as const, lastPayment: '2026-04-04', amount: 6.99, agentFav: 'finance', joined: '2026-03-20' },
  { id: 8, name: 'Diego Fernández', whatsapp: '+54 9 11 9012-3456', email: 'diego@gmail.com', plan: 'bundle', status: 'trial' as const, lastPayment: '-', amount: 0, agentFav: 'nutrition', joined: '2026-04-07' },
]

const statusLabels: Record<string, string> = {
  active: 'Activo',
  trial: 'Trial',
  past_due: 'Moroso',
  cancelled: 'Cancelado',
}

const agentEmojis: Record<string, string> = {
  finance: '💰',
  gym: '🏋️',
  nutrition: '🥗',
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.whatsapp.includes(search) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || u.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Usuarios</h1>
          <p className="admin-subtitle">{mockUsers.length} usuarios registrados</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Agregar Manual</button>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {(['all', 'active', 'trial', 'past_due'] as const).map(status => {
          const count = status === 'all' ? mockUsers.length : mockUsers.filter(u => u.status === status).length
          const label = status === 'all' ? 'Todos' : statusLabels[status]
          return (
            <div
              key={status}
              className="glass-card stat-card"
              style={{
                cursor: 'pointer',
                borderColor: filterStatus === status ? 'var(--primary)' : undefined,
              }}
              onClick={() => setFilterStatus(status)}
            >
              <div className="stat-card-label">{label}</div>
              <div className="stat-card-value" style={{ marginTop: '8px' }}>{count}</div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="glass-card data-table-wrapper">
        <div className="data-table-header">
          <span className="data-table-title">
            {filterStatus === 'all' ? 'Todos los usuarios' : `Usuarios ${statusLabels[filterStatus] || 'Todos'}`}
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o email..."
            className="data-table-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '320px' }}
          />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>WhatsApp</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Último Pago</th>
              <th>Agente Fav</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{user.whatsapp}</td>
                <td>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: user.plan === 'bundle' ? 'rgba(108, 92, 231, 0.12)' : 'rgba(0, 210, 255, 0.12)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: user.plan === 'bundle' ? 'var(--primary-light)' : 'var(--accent)',
                  }}>
                    {user.plan === 'bundle' ? 'Bundle x3' : '1 Agente'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    <span className="status-dot" />
                    {statusLabels[user.status]}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {user.lastPayment === '-' ? 'Trial' : `$${user.amount} — ${user.lastPayment}`}
                </td>
                <td style={{ fontSize: '1.2rem' }}>{agentEmojis[user.agentFav]}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 10px', fontSize: '0.7rem' }}
                    >
                      📩 Promo
                    </button>
                    {user.status === 'past_due' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 10px', fontSize: '0.7rem', borderColor: 'rgba(255,82,82,0.4)' }}
                      >
                        ⛔ Suspender
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
