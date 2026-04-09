'use client'

import { useState } from 'react'

const faqs = [
  {
    q: '¿Cómo funciona Life OS?',
    a: 'Simplemente mandás un mensaje de WhatsApp como lo harías con un amigo. Decile "Gasté $50 en nafta" o "¿Qué ceno hoy?" y el agente se encarga de todo: registra, calcula, sugiere y te mantiene al día con tus objetivos.',
  },
  {
    q: '¿Necesito descargar alguna app?',
    a: 'No. Life OS funciona 100% dentro de WhatsApp. No necesitás descargar nada ni crear cuentas nuevas. Mandás un mensaje y listo.',
  },
  {
    q: '¿Los 4 agentes hablan entre sí?',
    a: 'Sí. Esa es la magia. Si hoy entrenaste piernas (rutina pesada), el agente de comidas sube las proteínas automáticamente, el de finanzas ajusta el presupuesto del súper, y el de productividad bloquea tu calendario para que descanses. Todo conectado.',
  },
  {
    q: '¿Puedo mandar audios y fotos?',
    a: 'Sí. Mandá una foto del ticket del supermercado y el bot lee todo automáticamente. También entiende audios, así que podés hablarle sin escribir.',
  },
  {
    q: '¿Qué pasa si cancelo la suscripción?',
    a: 'Podés cancelar cuando quieras desde tu panel. Pero perdés el acceso a tu historial, tus rutinas y tu perfil personalizado. Si volvés, tenés que empezar de cero.',
  },
  {
    q: '¿Cómo funciona el programa de afiliados?',
    a: 'Compartís tu link único. Por cada persona que se suscriba a Life OS a través de tu enlace, ganás el 50% de la suscripción, todos los meses mientras el usuario siga activo. Sin límites.',
  },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo">
            <span className="gradient-text">Life</span>OS
          </a>
          <ul className="navbar-links">
            <li><a href="#agentes">Agentes</a></li>
            <li><a href="#precios">Precios</a></li>
            <li><a href="#afiliados">Afiliados</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#cta" className="btn btn-primary btn-sm">Comenzar Gratis</a></li>
          </ul>
        </div>
      </nav>

      {/* ====== HERO ====== */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">🤖 Potenciado con Inteligencia Artificial</div>
          <h1>
            Tu Asistente de <span className="gradient-text">Vida</span> en WhatsApp
          </h1>
          <p>
            4 agentes de IA que manejan tus finanzas, nutrición, entrenamiento y productividad.
            Solo mandá un mensaje. Sin apps. Sin complicaciones.
          </p>
          <div className="hero-cta">
            <a href="#precios" className="btn btn-primary btn-lg">
              Probar 14 días gratis →
            </a>
            <a href="#demo" className="btn btn-secondary btn-lg">
              Ver Demo
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value gradient-text">14</div>
              <div className="hero-stat-label">Días de prueba gratis</div>
            </div>
            <div>
              <div className="hero-stat-value gradient-text">4</div>
              <div className="hero-stat-label">Agentes inteligentes</div>
            </div>
            <div>
              <div className="hero-stat-value gradient-text">50%</div>
              <div className="hero-stat-label">Comisión para afiliados</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROBLEMA ====== */}
      <section className="section" id="problema">
        <div className="container">
          <h2 className="section-title">
            ¿Cuántas apps usás para <span className="gradient-text">manejar tu vida</span>?
          </h2>
          <p className="section-subtitle">
            Una para las finanzas, otra para el gym, otra para las comidas... Todas desconectadas. Life OS las reemplaza todas.
          </p>
          <div className="problem-grid">
            <div className="glass-card problem-card">
              <div className="icon" style={{ background: 'rgba(255, 82, 82, 0.12)' }}>💸</div>
              <h3>Finanzas descontroladas</h3>
              <p>Gastás sin saber en qué. A fin de mes no sabés a dónde fue la plata.</p>
            </div>
            <div className="glass-card problem-card">
              <div className="icon" style={{ background: 'rgba(255, 145, 0, 0.12)' }}>🍔</div>
              <h3>Comés sin plan</h3>
              <p>Pedís delivery 3 veces por semana porque no sabés qué cocinar con lo que tenés.</p>
            </div>
            <div className="glass-card problem-card">
              <div className="icon" style={{ background: 'rgba(0, 210, 255, 0.12)' }}>🏋️</div>
              <h3>Gym sin constancia</h3>
              <p>Arrancás motivado el lunes y el miércoles ya no sabés qué rutina seguir.</p>
            </div>
            <div className="glass-card problem-card">
              <div className="icon" style={{ background: 'rgba(255, 107, 157, 0.12)' }}>⏱️</div>
              <h3>Tiempo perdído</h3>
              <p>Procrastinás, tenés mil cosas por hacer y terminás el día quemado pero sin avances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== AGENTES ====== */}
      <section className="section" id="agentes">
        <div className="container">
          <h2 className="section-title">
            4 Agentes. <span className="gradient-text">1 solo WhatsApp.</span>
          </h2>
          <p className="section-subtitle">
            Hablales como a un amigo. Ellos se encargan del resto.
          </p>
          <div className="agents-grid">
            <div className="glass-card agent-card finance">
              <div className="agent-icon finance">💰</div>
              <h3>Agente Financiero</h3>
              <p>Tu guardián de plata. Registra gastos, controla presupuestos y te avisa antes de que sea tarde.</p>
              <ul className="agent-features">
                <li>Registro de gastos por mensaje o foto</li>
                <li>Alertas de presupuesto inteligentes</li>
                <li>Reportes semanales y mensuales</li>
                <li>Categorización automática</li>
                <li>Detección de gastos innecesarios</li>
              </ul>
            </div>
            <div className="glass-card agent-card gym">
              <div className="agent-icon gym">🏋️</div>
              <h3>Agente de Gym</h3>
              <p>Tu entrenador de bolsillo. Rutinas personalizadas que se adaptan a tu progreso.</p>
              <ul className="agent-features">
                <li>Rutinas de gym o casa personalizadas</li>
                <li>Progresión automática de carga</li>
                <li>Registro de PRs y avances</li>
                <li>Adapta según tu nivel de energía</li>
                <li>Videos de referencia de ejercicios</li>
              </ul>
            </div>
            <div className="glass-card agent-card nutrition">
              <div className="agent-icon nutrition">🥗</div>
              <h3>Agente Nutricional</h3>
              <p>Tu nutricionista 24/7. Menús, lista de compras y recetas con lo que tenés en la heladera.</p>
              <ul className="agent-features">
                <li>Menú semanal personalizado</li>
                <li>Lista de compras automática</li>
                <li>Recetas con lo que ya tenés</li>
                <li>Ajuste por presupuesto (conecta con finanzas)</li>
                <li>Adaptado a tus goals de gym</li>
              </ul>
            </div>
            <div className="glass-card agent-card productivity">
              <div className="agent-icon productivity">🧠</div>
              <h3>Agente de Productividad</h3>
              <p>Tu coach personal. Hábitos, gestión de tiempo y salud mental, todo alineado para que logres más.</p>
              <ul className="agent-features">
                <li>Planificador de día inteligente</li>
                <li>Pausa consciente / meditación guiada</li>
                <li>Seguimiento de hábitos diarios</li>
                <li>Reducción de procrastinación</li>
                <li>Integración con tu rutina física</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DEMO WHATSAPP ====== */}
      <section className="section demo-section" id="demo">
        <div className="container">
          <h2 className="section-title">
            Así de <span className="gradient-text">fácil</span> es usarlo
          </h2>
          <p className="section-subtitle">
            Solo mandá un mensaje. Sin formularios, sin apps, sin complicaciones.
          </p>
          <div className="phone-mockup">
            <div className="phone-header">
              <div className="phone-avatar">🧠</div>
              <div className="phone-contact">
                <div className="phone-contact-name">Life OS</div>
                <div className="phone-contact-status">en línea</div>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-msg user">
                Che, gasté $50 en el súper y $30 en nafta
                <div className="chat-time">14:32 ✓✓</div>
              </div>
              <div className="chat-msg bot">
                ✅ Anotado! $50 Súper + $30 Transporte.
                <br /><br />
                📊 Llevas $420 gastados esta semana. Te quedan $180 de presupuesto.
                <br /><br />
                💡 Tip: Compraste pollo y verduras. Le aviso al Agente Nutricional para que arme el menú con esos ingredientes.
                <div className="chat-time">14:32 ✓✓</div>
              </div>
              <div className="chat-msg user">
                Dale genio, ¿y qué hago hoy de gym?
                <div className="chat-time">14:33 ✓✓</div>
              </div>
              <div className="chat-msg bot">
                🏋️ Hoy toca: Tren superior (pecho + hombros)
                <br /><br />
                1. Press banca 4x10 (45kg)
                <br />
                2. Press militar 3x12 (20kg)
                <br />
                3. Aperturas 3x15
                <br />
                4. Laterales 4x12
                <br /><br />
                🍗 Post-entreno te armé un bowl de pollo con los ingredientes del súper. ¿Te paso la receta?
                <div className="chat-time">14:33 ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRECIOS ====== */}
      <section className="section" id="precios">
        <div className="container">
          <h2 className="section-title">
            Planes <span className="gradient-text">simples</span>
          </h2>
          <p className="section-subtitle">
            Empezá gratis. Cancelá cuando quieras. Sin letra chica.
          </p>
          <div className="pricing-grid">
            <div className="glass-card pricing-card">
              <div className="pricing-name">1 Agente</div>
              <div className="pricing-price">
                $6.99<span>/mes</span>
              </div>
              <div className="pricing-desc">Ideal para empezar</div>
              <ul className="pricing-features">
                <li>Agente de Finanzas completo</li>
                <li>Registro por texto, audio y foto</li>
                <li>Reportes semanales</li>
                <li>Alertas de presupuesto</li>
                <li>14 días gratis</li>
              </ul>
              <a href="#cta" className="btn btn-secondary" style={{ width: '100%' }}>
                Comenzar Gratis
              </a>
            </div>

            <div className="glass-card pricing-card featured">
              <div className="pricing-name">Life OS Bundle</div>
              <div className="pricing-price">
                $14.99<span>/mes</span>
              </div>
              <div className="pricing-desc">Los 4 agentes conectados</div>
              <ul className="pricing-features">
                <li>Agente de Finanzas</li>
                <li>Agente de Gym</li>
                <li>Agente de Nutrición</li>
                <li>Agente de Productividad</li>
                <li>Sinergia total entre agentes</li>
                <li>Reportes cruzados</li>
                <li>Soporte prioritario</li>
                <li>14 días gratis</li>
              </ul>
              <a href="#cta" className="btn btn-primary" style={{ width: '100%' }}>
                Probar Gratis →
              </a>
            </div>

            <div className="glass-card pricing-card">
              <div className="pricing-name">Bundle Anual</div>
              <div className="pricing-price">
                $129<span>/año</span>
              </div>
              <div className="pricing-desc">Ahorrá $50 al año</div>
              <ul className="pricing-features">
                <li>Todo del Bundle mensual (4 agentes)</li>
                <li>Ahorro de $50 vs mensual</li>
                <li>Acceso prioritario a novedades</li>
                <li>Sesión de onboarding 1-a-1</li>
                <li>14 días de garantía</li>
              </ul>
              <a href="#cta" className="btn btn-secondary" style={{ width: '100%' }}>
                Elegir Anual
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== AFILIADOS ====== */}
      <section className="section" id="afiliados">
        <div className="container">
          <div className="affiliate-content">
            <div className="affiliate-text">
              <h2>
                Ganá <span className="gradient-text">50% de comisión</span> de por vida
              </h2>
              <p>
                Compartí tu link. Por cada persona que se suscriba, ganás la mitad de su
                suscripción todos los meses. Sin límites, sin techo.
              </p>
              <div className="affiliate-perks">
                <div className="affiliate-perk">
                  <div className="affiliate-perk-icon">🔗</div>
                  <div>
                    <h4>Tu link único</h4>
                    <p>Compartí en redes, WhatsApp o donde quieras.</p>
                  </div>
                </div>
                <div className="affiliate-perk">
                  <div className="affiliate-perk-icon">💰</div>
                  <div>
                    <h4>50% recurrente</h4>
                    <p>Ganás todos los meses mientras el usuario pague.</p>
                  </div>
                </div>
                <div className="affiliate-perk">
                  <div className="affiliate-perk-icon">📦</div>
                  <div>
                    <h4>Kit de ventas incluido</h4>
                    <p>Videos, copies y creativos listos para publicar.</p>
                  </div>
                </div>
                <div className="affiliate-perk">
                  <div className="affiliate-perk-icon">📚</div>
                  <div>
                    <h4>Curso de escalamiento</h4>
                    <p>Te enseñamos a armar campañas que vendan solas.</p>
                  </div>
                </div>
              </div>
              <a href="#cta" className="btn btn-primary">
                Quiero ser Afiliado →
              </a>
            </div>
            <div className="affiliate-visual">
              <div className="glass-card affiliate-earnings">
                <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 700 }}>
                  Simulador de Ganancias 💸
                </h3>
                <div className="earnings-row">
                  <span className="earnings-label">Referidos activos</span>
                  <span className="earnings-value">10 personas</span>
                </div>
                <div className="earnings-row">
                  <span className="earnings-label">Plan promedio</span>
                  <span className="earnings-value">$14.99/mes</span>
                </div>
                <div className="earnings-row">
                  <span className="earnings-label">Tu comisión (50%)</span>
                  <span className="earnings-value">$7.50 c/u</span>
                </div>
                <div className="earnings-row">
                  <span className="earnings-label">Ganancia mensual</span>
                  <span className="earnings-value green">$75.00/mes</span>
                </div>
                <div className="earnings-row">
                  <span className="earnings-label" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    Ganancia anual
                  </span>
                  <span className="earnings-value green" style={{ fontSize: '1.4rem' }}>
                    $900.00/año
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="section" id="faq">
        <div className="container">
          <h2 className="section-title">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="section-subtitle">
            Todo lo que necesitás saber antes de empezar.
          </p>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`glass-card faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-question">
                  {faq.q}
                  <span className="faq-arrow">▼</span>
                </div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA FINAL ====== */}
      <section className="cta-section" id="cta">
        <div className="container">
          <h2>
            ¿Listo para tomar el <span className="gradient-text">control</span>?
          </h2>
          <p>14 días gratis. Sin tarjeta. Sin compromiso.</p>
          <a
            href="https://wa.me/TUNUMERO?text=Hola!%20Quiero%20probar%20Life%20OS"
            className="btn btn-primary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Activar mi Life OS gratis →
          </a>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3><span className="gradient-text">Life</span>OS</h3>
              <p>
                Tu asistente de vida en WhatsApp. Finanzas, nutrición, entrenamiento y
                productividad manejados por inteligencia artificial.
              </p>
            </div>
            <div className="footer-col">
              <h4>Producto</h4>
              <ul>
                <li><a href="#agentes">Agentes</a></li>
                <li><a href="#precios">Precios</a></li>
                <li><a href="#demo">Demo</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Comunidad</h4>
              <ul>
                <li><a href="#afiliados">Ser Afiliado</a></li>
                <li><a href="https://skool.com" target="_blank" rel="noopener noreferrer">Curso Gratuito de IA</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} Life OS. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  )
}
