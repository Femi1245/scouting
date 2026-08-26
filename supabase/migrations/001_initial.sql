-- Scouter Autonomous AI Client Acquisition Platform
-- PostgreSQL / Supabase schema (production)

create extension if not exists "pgcrypto";

-- Workspaces & membership
create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  demo_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  website text,
  industry text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  description text not null,
  summary jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists icp_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  natural_language text,
  industries text[] default '{}',
  locations text[] default '{}',
  company_sizes text[] default '{}',
  problems text[] default '{}',
  structured jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agent_permissions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade unique,
  mode text not null default 'draft', -- draft | approval | autopilot
  find_businesses boolean not null default true,
  analyze_websites boolean not null default true,
  find_contacts boolean not null default true,
  generate_outreach boolean not null default true,
  send_approved_emails boolean not null default false,
  send_autopilot_emails boolean not null default false,
  read_replies boolean not null default false,
  draft_replies boolean not null default true,
  send_automatic_replies boolean not null default false,
  schedule_followups boolean not null default false,
  daily_send_limit int not null default 25,
  max_new_contacts_per_day int not null default 20,
  working_hours jsonb,
  paused boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists scouts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  mission text not null,
  status text not null default 'draft', -- draft | running | paused | completed
  sources text[] default '{}',
  targeting jsonb not null default '{}',
  min_score int not null default 70,
  daily_research_limit int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists scout_runs (
  id uuid primary key default gen_random_uuid(),
  scout_id uuid not null references scouts(id) on delete cascade,
  status text not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  stats jsonb default '{}',
  created_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  website text,
  industry text,
  location text,
  company_size text,
  description text,
  demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists company_sources (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  source text not null,
  source_url text,
  raw jsonb,
  created_at timestamptz not null default now()
);

create table if not exists websites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  url text not null,
  last_fetched_at timestamptz,
  fetch_status text,
  created_at timestamptz not null default now()
);

create table if not exists website_analyses (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references websites(id) on delete cascade,
  signals jsonb not null default '{}',
  observations text[] default '{}',
  confidence numeric,
  analyzed_at timestamptz not null default now(),
  provider text
);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  company_id uuid not null references companies(id) on delete cascade,
  scout_id uuid references scouts(id) on delete set null,
  score int not null default 0,
  score_breakdown jsonb not null default '{}',
  detected_problems text[] default '{}',
  service_match text,
  status text not null default 'new',
  recommendation text,
  why_match text,
  outreach_angle text,
  demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  company_id uuid not null references companies(id) on delete cascade,
  full_name text,
  title text,
  email text,
  linkedin_url text,
  provenance text,
  demo boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists contact_sources (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  source text not null,
  source_url text,
  created_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  status text not null default 'draft',
  config jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_leads (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  status text not null default 'queued',
  unique (campaign_id, opportunity_id)
);

create table if not exists email_accounts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  provider text not null, -- gmail | microsoft
  email text not null,
  status text not null default 'disconnected',
  scopes text[] default '{}',
  encrypted_tokens text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists outreach_drafts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  subject text not null,
  body text not null,
  status text not null default 'draft', -- draft | awaiting_approval | approved | sent | discarded
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists email_threads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null,
  subject text,
  classification text,
  classification_confidence numeric,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists email_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references email_threads(id) on delete cascade,
  direction text not null, -- outbound | inbound
  subject text,
  body text not null,
  provider_message_id text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists followups (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  thread_id uuid references email_threads(id) on delete cascade,
  day_offset int not null,
  status text not null default 'scheduled',
  scheduled_for timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  company_id uuid references companies(id) on delete set null,
  title text not null,
  status text not null default 'requested',
  starts_at timestamptz,
  ends_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists agent_tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}',
  status text not null default 'queued',
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agent_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  type text not null,
  message text not null,
  meta jsonb default '{}',
  created_at timestamptz not null default now()
);

create table if not exists suppression_list (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  kind text not null, -- email | domain | company
  value text not null,
  reason text,
  created_at timestamptz not null default now(),
  unique (workspace_id, kind, value)
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  actor_id uuid,
  action text not null,
  resource_type text,
  resource_id text,
  meta jsonb default '{}',
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade unique,
  plan text not null default 'free',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists usage_records (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  metric text not null,
  quantity int not null default 1,
  meta jsonb default '{}',
  created_at timestamptz not null default now()
);

-- RLS placeholders (enable per table in production)
-- alter table workspaces enable row level security;
