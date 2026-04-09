'use client'

import { useState } from 'react'

const mockAffiliate = {
  name: 'Roberto Sánchez',
  code: 'ROBERTO50',
  link: 'https://lifeos.app/ref/ROBERTO50',
  commissionRate: 50,
  referrals: 12,
  activeReferrals: 10,
  totalEarned: 1079.28,
  totalPaid: 800,
  pending: 279.28,
  thisMonth: 149.90,
}

const mockReferrals = [
  { name: 'María G.', plan: 'Bundle x3', status: 'active', commission: 7.50, date: '2026-04-01' },
  { name: 'Pedro G.', plan: 'Bundle x3', status: 'active', commission: 7.50, date: '2026-03-28' },
  { name: 'Sofía T.', plan: '1 Agente', status: 'active', commission: 3.50, date: '2026-03-20' },
  { name: 'Diego F.', plan: 'Bundle x3', status: 'trial', commission: 0, date: '2026-04-07' },
  { name: 'Laura M.', plan: 'Bundle x3', status: 'cancelled', commission: 0, date: '2026-02-15' },
]

const resources = [
  { name: '📹 Videos para Reels/TikTok', desc: '5 videos editados listos para publicar', link: '#' },
  { name: '📝 Copies para Ads', desc: '10 copies probados para Facebook/Instagram Ads', link: '#' },
  { name: '🖼️ Banners y Creativos', desc: 'Stories, posts y banners en alta calidad', link: '#' },
  { name: '📊 Presentación de Ventas', desc: 'PDF con stats y argumentos para cerrar clientes', link: '#' },
]

export default function AffiliateDashboard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(mockAffiliate.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Hola, {mockAffiliate.name.split(' ')[0]}! 👋</h1>
          <p className="admin-subtitle">Tu portal de afiliado Life OS</p>
        </div>
      </div>

      {/* Hero Card with Link */}
      <div className="glass-card affiliate-hero-card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
          Tu Link de Referido
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
          Compartí este link y ganá <span className="gradient-text" style={{ fontWeight: 700 }}>50% de comisión</span> por cada venta
        </p>
        <div className="referral-link-box">
          <input type="text" value={mockAffiliate.link} readOnly />
          <button onClick={handleCopy}>
            {copied ? '✅ Copiado' : '📋 Copiar'}
          </button>
        </div>
        <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Código: <strong>{mockAffiliate.code}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Ganancia Total</span>
            <div className="stat-card-icon" style={{ background: 'rgba(0, 230, 118, 0.15)' }}>💰</div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--accent-green)' }}>
            ${mockAffiliate.totalEarned.toFixed(2)}
          </div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Este Mes</span>
            <div className="stat-card-icon" style={{ background: 'rgba(108, 92, 231, 0.15)' }}>📈</div>
          </div>
          <div className="stat-card-value">${mockAffiliate.thisMonth.toFixed(2)}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Referidos Activos</span>
            <div className="stat-card-icon" style={{ background: 'rgba(0, 210, 255, 0.15)' }}>👥</div>
          </div>
          <div className="stat-card-value">{mockAffiliate.activeReferrals}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Pendiente de Cobro</span>
            <div className="stat-card-icon" style={{ background: 'rgba(255, 145, 0, 0.15)' }}>⏳</div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--accent-orange)' }}>
            ${mockAffiliate.pending.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Earnings Projection */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '32px', background: 'var(--gradient-card)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>💡 Tu proyección mensual</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Con 10 referidos</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>$75/mes</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Con 50 referidos</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>$375/mes</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Con 100 referidos</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>$750/mes</div>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="glass-card data-table-wrapper" style={{ marginBottom: '32px' }}>
        <div className="data-table-header">
          <span className="data-table-title">Mis Referidos</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Comisión/mes</th>
              <th>Desde</th>
            </tr>
          </thead>
          <tbody>
            {mockReferrals.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: r.plan.includes('Bundle') ? 'rgba(108, 92, 231, 0.12)' : 'rgba(0, 210, 255, 0.12)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: r.plan.includes('Bundle') ? 'var(--primary-light)' : 'var(--accent)',
                  }}>
                    {r.plan}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${r.status}`}>
                    <span className="status-dot" />
                    {r.status === 'active' ? 'Activo' : r.status === 'trial' ? 'Trial' : 'Cancelado'}
                  </span>
                </td>
                <td style={{ color: r.commission > 0 ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 600 }}>
                  {r.commission > 0 ? `$${r.commission.toFixed(2)}` : '-'}
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resources */}
      <h3 id="resources" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📦 Recursos para Vender</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {resources.map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>{r.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{r.desc}</p>
            <a href={r.link} className="btn btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>
              ⬇️ Descargar
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
