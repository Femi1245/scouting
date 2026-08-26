# Zumelia Scout — Autonomous AI Client Acquisition Agent

Tell the platform what you sell. Your AI agent scouts businesses, scores opportunities, drafts personalized outreach, and — with your approval — helps turn replies into meetings.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Supabase Auth + PostgreSQL (schema in `supabase/migrations`)
- Provider abstractions for search, website analysis, contacts, AI, and email
- Demo Mode with clearly labeled fictional data

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Start Scouting** or **Log in** → enter Demo Mode.

## Demo Mode

`NEXT_PUBLIC_DEMO_MODE=true` (default) uses fictional companies, contacts, and replies. Every demo surface is labeled **Demo data**. Never treat it as production truth.

## Product shell (MVP)

- Landing, signup/login, 7-step onboarding
- Dashboard: Overview, AI Agent, Opportunities, Scouts, Companies, Contacts, Outreach, Inbox, Campaigns, Meetings, Analytics, Integrations, Settings
- Agent permissions, pause/kill switch UI, activity log
- Opportunity scoring engine + tool guards
- Audit + usage ledgers (in-memory for demo; Postgres tables ready)

## Production schema

Apply `supabase/migrations/001_initial.sql` in your Supabase project, then set:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Enable RLS policies before going live.

## Google sign-in (Supabase Auth)

1. Google Cloud Console → OAuth client (Web)
2. Authorized redirect URI (Supabase, not your app):
   `https://txbttmhzbqbvfmjdqgvf.supabase.co/auth/v1/callback`
3. Supabase Dashboard → **Authentication** → **Providers** → **Google**
   - Paste Client ID + Client Secret
   - Enable the provider
4. Supabase → **Authentication** → **URL configuration**
   - Site URL: `http://localhost:3000` (and production URL when live)
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `https://zumeliascout.vercel.app/auth/callback`
5. App login page → **Continue with Google**

`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `.env` are for Gmail sending later (Integrations), not required for Supabase login.


1. Create an account at [console.groq.com](https://console.groq.com)
2. Open [API Keys](https://console.groq.com/keys) → Create API Key
3. In `.env`:

```
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile
AI_PROVIDER=groq
```

4. Restart `npm run dev`

Faster/cheaper option: `GROQ_MODEL=llama-3.1-8b-instant`

OpenAI/Anthropic keys are optional; Zumelia Scout uses Groq when `AI_PROVIDER=groq`.


Configure Google / Microsoft client IDs in `.env`. Tokens must be encrypted with `TOKEN_ENCRYPTION_KEY`. Never ask users for email passwords.

## Architecture

| Path | Role |
|------|------|
| `src/lib/providers` | Search / analyzer / contact / AI / email interfaces |
| `src/lib/agent` | Permissions, scoring, guarded tools |
| `src/lib/demo` | Labeled demo dataset |
| `src/lib/audit` / `usage` | Transparency + monetization ledger |
| `supabase/migrations` | Full Postgres model |

## Phased delivery

1. Foundation shell (this MVP)  
2. Live service understanding + ICP  
3. Real scout discovery providers  
4. Website intelligence  
5. Outreach + approval  
6. Gmail/Microsoft OAuth send + inbox sync  
7. Reply classification + follow-ups  
8. Analytics  
9. Autopilot within hard limits  

## Safety

Draft / Approval / Autopilot modes, daily limits, suppression lists, audit logs, pause + kill switch. No scraping behind CAPTCHA/auth. No invented “verified” technical claims — use **Not verified** when unknown.
