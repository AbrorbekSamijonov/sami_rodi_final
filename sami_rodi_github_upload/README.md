# SamiRodi — Marketing Site

Single-page marketing site for SamiRodi's shade-resilient solar panels (CPCF cell protection).
Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Recharts · react-hook-form + zod · Supabase · Resend.

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only, never exposed to the client) |
| `RESEND_API_KEY` | Resend API key |
| `LEADS_NOTIFY_EMAIL` | Team inbox that receives each new lead |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://samirodi.com` (used for metadata, sitemap) |
| `RESEND_FROM_EMAIL` | Optional verified sender. Defaults to Resend's sandbox sender, which can only deliver to your own Resend account email until you verify a domain. |

### Supabase

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. It creates the `leads` table with Row Level Security enabled and no policies, so only the server-side service role key can insert.

## Replacing placeholder content

All claims, prices, stats and links live in two places, marked `TODO`:

- `lib/config.ts`: foundation patent record (`PATENT`), trust claims, stats, research paper, pricing, comparison table, FAQ.
- `data/charts.ts`: chart data (`PLACEHOLDER — replace with real data from published research`).

Also fill in the "bypass diodes" explanation in `components/HowItWorks.tsx` and the legal text in `app/privacy` and `app/terms`.

## Contact form flow

`POST /api/contact` validates with zod, drops honeypot hits, rate-limits by IP (5 per 10 minutes, in-memory), inserts into Supabase, then emails the team and the customer via Resend. The in-memory limiter is per serverless instance; use Upstash Ratelimit for strict global limits.

## Deploy to Vercel

1. Create a git repo and push to GitHub:
   ```bash
   git init && git add . && git commit -m "Initial commit"
   git remote add origin <your-repo-url> && git push -u origin main
   ```
2. In Vercel: **New Project** → import the repo (framework auto-detected as Next.js).
3. Add all environment variables under **Project Settings → Environment Variables**.
4. Deploy, then submit the contact form on the live site and check the Supabase `leads` row and both emails.
5. Optional: add a custom domain (e.g. `samirodi.com`) under **Domains**, and update `NEXT_PUBLIC_SITE_URL`.
