# LifeOS - AI Ecosystem & CRM

LifeOS es una plataforma SaaS diseñada para gestionar un ecosistema de agentes de IA interconectados vía WhatsApp. Integra un CRM completo para administrar clientes, afiliados y campañas, además de controlar suscripciones con webhooks automatizados.

## 🚀 Características Principales

1. **Dashboard de Administración**: Métricas en tiempo real, MRR, usuarios activos, y gestión integral de clientes.
2. **Sistema de Afiliados**: Portal dedicado con links únicos de referido, cálculo de comisiones (CPA/RevShare), y proyecciones de ganancias.
3. **Agentes de IA (WhatsApp)**: Infraestructura preparada para enrutar mensajes a 4 agentes especializados (Finanzas, Gym, Nutrición, Productividad) conectando con n8n y Meta Cloud API.
4. **Campañas de Retargeting**: Plantillas para envíos de campañas manuales o automatizadas por WhatsApp.
5. **Pagos y Webhooks**: Integración lista para gestionar cobros, pruebas gratuitas (trials) y facturación recurrentes, con endpoints de control para el bot.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS.
- **Backend**: Next.js API Routes.
- **Base de Datos**: Supabase (PostgreSQL) - *[Ver esquema en `supabase/schema.sql`]*
- **Webhooks y Pagos**: Hooks listos para procesar los eventos.
- **Orquestación de IA**: n8n (para el flujo conversacional inteligente en WhatsApp).

## 📁 Estructura del Proyecto

- `/src/app`: Rutas del frontend (Landing page generadora de leads, `/admin`, `/affiliate`).
- `/src/app/api`: Endpoints del backend (webhooks de WhatsApp, cobros, validación de acceso `bot/verify`).
- `/src/lib`: Utilidades y configuraciones de servicios externos (clientes de Supabase y pasarelas).
- `/supabase/schema.sql`: Estructura pre-diseñada de la base de datos lista para desplegar.
- `/AGENTS.md` y `/n8n_prompts_guide.md`: Guías y prompts para la creación de los flujos.

## ⚙️ Configuración y Despliegue Local

### 1. Descargar e Instalar
```bash
git clone https://github.com/onepercentgsgr/-LifeOS-.git
cd -LifeOS-
npm install
```

### 2. Variables de Entorno
Copia el archivo `.env.example` y renómbralo a `.env.local` (o créalo si no existe).
Asegúrate de llenar las credenciales con tus llaves reales de Supabase y la API de Pagos:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
```

### 3. Configurar Base de Datos (Supabase)
Dentro del dashboard de tu proyecto en Supabase, ve al apartado "SQL Editor", crea una nueva consulta y pega todo el contenido del archivo `supabase/schema.sql`. Al ejecutarlo, se crearán de inmediato las 8 tablas estructurales del proyecto.

### 4. Lanzar el Servidor en Modo Desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000) y verás la plataforma corriendo.

---
*Este proyecto está preparado para hacer deploy de manera instantánea conectando el repositorio directamente a Vercel.*
