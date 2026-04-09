-- =====================================================
-- LIFE OS — Schema de Base de Datos (Supabase/PostgreSQL)
-- Ejecutar en el SQL Editor de Supabase
-- =====================================================

-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA: users (Usuarios del bot)
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(255),
  country VARCHAR(50) DEFAULT 'Argentina',
  currency VARCHAR(10) DEFAULT 'ARS',
  status VARCHAR(20) NOT NULL DEFAULT 'trial'
    CHECK (status IN ('trial', 'active', 'past_due', 'cancelled')),
  plan VARCHAR(20) NOT NULL DEFAULT 'single'
    CHECK (plan IN ('single', 'bundle', 'affiliate')),
  monthly_message_count INT DEFAULT 0,
  tokens_used_this_month INT DEFAULT 0,
  monthly_limit INT DEFAULT 1000,
  stripe_customer_id VARCHAR(255),
  affiliate_id UUID REFERENCES affiliates(id),
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_whatsapp ON users(whatsapp_number);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_affiliate ON users(affiliate_id);

-- =====================================================
-- TABLA: subscriptions (Suscripciones de Stripe)
-- =====================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  plan VARCHAR(20) NOT NULL,
  status VARCHAR(30) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);

-- =====================================================
-- TABLA: affiliates (Afiliados / Socios)
-- =====================================================
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  referral_code VARCHAR(50) UNIQUE NOT NULL,
  referral_link VARCHAR(255),
  commission_rate DECIMAL(3, 2) DEFAULT 0.50,
  total_earned DECIMAL(10, 2) DEFAULT 0,
  total_paid DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_affiliates_code ON affiliates(referral_code);

-- =====================================================
-- TABLA: commissions (Comisiones generadas)
-- =====================================================
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid')),
  stripe_payment_id VARCHAR(255),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_commissions_affiliate ON commissions(affiliate_id);
CREATE INDEX idx_commissions_status ON commissions(status);

-- =====================================================
-- TABLA: bot_messages (Log de mensajes para analytics)
-- =====================================================
CREATE TABLE bot_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_type VARCHAR(20) NOT NULL
    CHECK (agent_type IN ('finance', 'gym', 'nutrition', 'system')),
  direction VARCHAR(5) NOT NULL
    CHECK (direction IN ('in', 'out')),
  message_type VARCHAR(20) DEFAULT 'text'
    CHECK (message_type IN ('text', 'audio', 'image', 'document')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bot_messages_user ON bot_messages(user_id);
CREATE INDEX idx_bot_messages_agent ON bot_messages(agent_type);
CREATE INDEX idx_bot_messages_date ON bot_messages(created_at);

-- =====================================================
-- TABLA: financial_records (Registros financieros)
-- =====================================================
CREATE TABLE financial_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  description TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_financial_user ON financial_records(user_id);
CREATE INDEX idx_financial_date ON financial_records(date);
CREATE INDEX idx_financial_category ON financial_records(category);

-- =====================================================
-- TABLA: gym_sessions (Sesiones de gym)
-- =====================================================
CREATE TABLE gym_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workout_type VARCHAR(50),
  exercises JSONB,
  duration_minutes INT,
  notes TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gym_user ON gym_sessions(user_id);

-- =====================================================
-- TABLA: meal_plans (Planes de comida)
-- =====================================================
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  description TEXT,
  ingredients JSONB,
  calories INT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_meal_user ON meal_plans(user_id);

-- =====================================================
-- TABLA: message_queue (Protección Asíncrona Webhook)
-- =====================================================
CREATE TABLE message_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp_message_id VARCHAR(255) UNIQUE NOT NULL,
  sender_number VARCHAR(20) NOT NULL,
  raw_payload JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_log TEXT,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_mq_status ON message_queue(status);
CREATE INDEX idx_mq_received ON message_queue(received_at);

-- =====================================================
-- TABLA: agent_memories (Memoria a Largo Plazo)
-- =====================================================
CREATE TABLE agent_memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_type VARCHAR(20) NOT NULL
    CHECK (agent_type IN ('finance', 'gym', 'nutrition', 'productivity', 'global')),
  memory_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, agent_type)
);

CREATE INDEX idx_memories_user ON agent_memories(user_id);

-- =====================================================
-- FUNCIÓN: Auto-update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- FUNCIÓN: Incrementar comisión (para webhook)
-- =====================================================
CREATE OR REPLACE FUNCTION increment_affiliate_earnings(
  affiliate_uuid UUID,
  earning_amount DECIMAL
)
RETURNS void AS $$
BEGIN
  UPDATE affiliates
  SET total_earned = total_earned + earning_amount
  WHERE id = affiliate_uuid;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- RLS: Row Level Security (activar para producción)
-- =====================================================
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bot_messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE gym_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
