'use client'

import { useState } from 'react'

// Mock data — en producción viene de Supabase
const mockStats = {
  totalUsers: 247,
  activeUsers: 189,
  trialUsers: 43,
  cancelledUsers: 15,
  mrr: 2835,
  mrrGrowth: 12.5,
  newUsersThisMonth: 58,
  churnRate: 3.2,
}

const mockChartData = [
  { month: 'Oct', users: 45, mrr: 540 },
  { month: 'Nov', users: 78, mrr: 960 },
  { month: 'Dic', users: 112, mrr: 1450 },
  { month: 'Ene', users: 156, mrr: 1980 },
  { month: 'Feb', users: 198, mrr: 2420 },
  { month: 'Mar', users: 247, mrr: 2835 },
]

const mockRecentUsers = [
  { id: 1, name: 'María González', whatsapp: '+54 9 11 2345-6789', plan: 'bundle', status: 'active' as const, joined: '2026-04-01' },
  { id: 2, name: 'Juan Pérez', whatsapp: '+54 9 11 3456-7890', plan: 'single', status: 'trial' as const, joined: '2026-04-05' },
  { id: 3, name: 'Lucía Martínez', whatsapp: '+54 9 11 4567-8901', plan: 'bundle', status: 'active' as const, joined: '2026-03-28' },
  { id: 4, name: 'Carlos López', whatsapp: '+54 9 11 5678-9012', plan: 'single', status: 'past_due' as const, joined: '2026-03-15' },
  { id: 5, name: 'Ana Rodríguez', whatsapp: '+54 9 11 6789-0123', plan: 'bundle', status: 'cancelled' as const, joined: '2026-02-20' },
]

const statusLabels: Record<string, string> = {
  active: 'Activo',
  trial: 'Trial',
  past_due: 'Moroso',
  cancelled: 'Cancelado',
}

export default function AdminDashboard() {
  const [period] = useState('30d')

  const maxMrr = Math.max(...mockChartData.map(d => d.mrr))

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Resumen general de Life OS</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={`btn btn-sm ${period === '7d' ? 'btn-primary' : 'btn-secondary'}`}>7 días</button>
          <button className={`btn btn-sm ${period === '30d' ? 'btn-primary' : 'btn-secondary'}`}>30 días</button>
          <button className={`btn btn-sm ${period === '90d' ? 'btn-primary' : 'btn-secondary'}`}>90 días</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">MRR</span>
            <div className="stat-card-icon" style={{ background: 'rgba(108, 92, 231, 0.15)' }}>💰</div>
          </div>
          <div className="stat-card-value">${mockStats.mrr.toLocaleString()}</div>
          <div className="stat-card-change positive">↑ {mockStats.mrrGrowth}% vs mes anterior</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Usuarios Activos</span>
            <div className="stat-card-icon" style={{ background: 'rgba(0, 230, 118, 0.15)' }}>👥</div>
          </div>
          <div className="stat-card-value">{mockStats.activeUsers}</div>
          <div className="stat-card-change positive">+{mockStats.newUsersThisMonth} este mes</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">En Trial</span>
            <div className="stat-card-icon" style={{ background: 'rgba(0, 210, 255, 0.15)' }}>⏳</div>
          </div>
          <div className="stat-card-value">{mockStats.trialUsers}</div>
          <div className="stat-card-change positive">Potencial: ${(mockStats.trialUsers * 14.99).toFixed(0)}/mes</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Churn Rate</span>
            <div className="stat-card-icon" style={{ background: 'rgba(255, 82, 82, 0.15)' }}>📉</div>
          </div>
          <div className="stat-card-value">{mockStats.churnRate}%</div>
          <div className="stat-card-change negative">{mockStats.cancelledUsers} cancelados</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="glass-card chart-card">
          <div className="chart-card-header">
            <span className="chart-card-title">Crecimiento MRR</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', padding: '0 8px' }}>
            {mockChartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600 }}>${d.mrr}</span>
                <div
                  style={{
                    width: '100%',
                    height: `${(d.mrr / maxMrr) * 160}px`,
                    background: 'var(--gradient-primary)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.5s ease',
                    minHeight: '20px',
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card chart-card">
          <div className="chart-card-header">
            <span className="chart-card-title">Distribución</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bundle x3</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>68%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: 'var(--gradient-primary)', borderRadius: '4px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>1 Agente</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>22%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '22%', height: '100%', background: 'var(--accent)', borderRadius: '4px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Anual</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>10%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', background: 'var(--accent-green)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Agente más usado</div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>💰 Finanzas (72% de mensajes)</div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="glass-card data-table-wrapper">
        <div className="data-table-header">
          <span className="data-table-title">Usuarios Recientes</span>
          <input type="text" placeholder="Buscar usuario..." className="data-table-search" />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>WhatsApp</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockRecentUsers.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: 600 }}>{user.name}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{user.whatsapp}</td>
                <td>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(108, 92, 231, 0.12)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--primary-light)',
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
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user.joined}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
