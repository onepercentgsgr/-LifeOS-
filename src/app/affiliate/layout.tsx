import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portal Afiliado — Life OS',
  description: 'Tu panel de afiliado de Life OS',
}

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a href="/" className="sidebar-logo">
          <span className="gradient-text">Life</span>OS
        </a>

        <div className="sidebar-section-title">Mi Portal</div>
        <nav className="sidebar-nav">
          <a href="/affiliate" className="sidebar-link active">
            📊 Mi Dashboard
          </a>
          <a href="/affiliate#resources" className="sidebar-link">
            📦 Recursos
          </a>
        </nav>

        <div className="sidebar-section-title">Soporte</div>
        <nav className="sidebar-nav">
          <a href="https://wa.me/TUNUMERO" className="sidebar-link" target="_blank" rel="noopener noreferrer">
            💬 Soporte WhatsApp
          </a>
          <a href="/" className="sidebar-link">
            🌐 Ver Landing
          </a>
        </nav>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}
