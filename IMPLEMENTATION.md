# Basic64School — Implementation Status

## Project
- **Domain:** https://basic64school.com
- **Local path:** `~/.hermes/projects/basic64school/`
- **Purpose:** Commodore 64 BASIC browser-based learning platform (K-12)

---

## Status Overview (as of 2026-05-13)

### Content Generation: ✅ COMPLETE
- **61 markdown files** written total
- **All 42 curriculum lessons** across Level 0-6
- **All 16 track modules** across Games, Creative Coding, Systems & Tools

### Infrastructure: ✅ COMPLETE
- **Supabase:** Created with SQL tables (profiles, progress, triggers, RLS)
- **Auth:** Email + Google OAuth login/logout
- **Stripe:** One-time $25 premium payment
- **Content Gating:** Free = Levels 0-2, Premium = Levels 3-6
- **Progress Tracking:** Mark lessons complete → saved to Supabase
- **Sidebar:** Auth-aware with progress indicator

---

## Progress Tracking

- Users can mark lessons complete via "Mark Lesson Complete" button
- Progress stored in Supabase `progress` table
- Shown in sidebar per level

## Content Gating

- Levels 0-2: Always accessible
- Levels 3-6: Premium only
- Upgrade path via `/premium` page → Stripe checkout

## Stripe

- One-time $25 payment via Stripe Checkout
- Webhook at `/api/stripe/webhook` sets `is_premium = true`
- Customer portal for managing subscription

## Deployment Checklist

- [ ] Install dependencies: `npm install @supabase/supabase-js stripe`
- [ ] Add env vars on Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_APP_URL`
- [ ] Set Stripe webhook endpoint: `https://basic64school.com/api/stripe/webhook`
