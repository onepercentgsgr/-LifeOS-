export type UserStatus = 'trial' | 'active' | 'past_due' | 'cancelled'
export type UserPlan = 'single' | 'bundle' | 'affiliate'
export type AgentType = 'finance' | 'gym' | 'nutrition' | 'productivity'
export type CommissionStatus = 'pending' | 'paid'
export type AffiliateStatus = 'active' | 'inactive'

export interface User {
  id: string
  whatsapp_number: string
  name: string
  email: string
  country: string
  currency: string
  status: UserStatus
  plan: UserPlan
  stripe_customer_id?: string
  affiliate_id?: string
  created_at: string
  trial_ends_at?: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  plan: UserPlan
  status: string
  amount: number
  current_period_start: string
  current_period_end: string
  cancelled_at?: string
}

export interface Affiliate {
  id: string
  user_id: string
  name: string
  email: string
  referral_code: string
  referral_link: string
  commission_rate: number
  total_earned: number
  total_paid: number
  status: AffiliateStatus
  created_at: string
}

export interface Commission {
  id: string
  affiliate_id: string
  referred_user_id: string
  amount: number
  status: CommissionStatus
  stripe_payment_id?: string
  created_at: string
}

export interface BotMessage {
  id: string
  user_id: string
  agent_type: AgentType
  direction: 'in' | 'out'
  created_at: string
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  trialUsers: number
  cancelledUsers: number
  mrr: number
  mrrGrowth: number
  newUsersThisMonth: number
  churnRate: number
}
