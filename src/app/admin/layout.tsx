import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Life OS Dashboard',
  description: 'Panel de administración de Life OS',
}

export default function AdminLayout({
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

        <div className="sidebar-section-title">Principal</div>
        <nav className="sidebar-nav">
          <a href="/admin" className="sidebar-link active">
            📊 Dashboard
          </a>
          <a href="/admin/users" className="sidebar-link">
            👥 Usuarios
          </a>
          <a href="/admin/affiliates" className="sidebar-link">
            🤝 Afiliados
          </a>
          <a href="/admin/campaigns" className="sidebar-link">
            📣 Campañas
          </a>
        </nav>

        <div className="sidebar-section-title">Sistema</div>
        <nav className="sidebar-nav">
          <a href="/admin/settings" className="sidebar-link">
            ⚙️ Configuración
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
