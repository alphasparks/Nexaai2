# NexaAI — Scholarship Finder for Ugandan Students

A React + Vite app that helps Ugandan students discover, get AI-matched to, and track
real scholarships. Originally prototyped as a Claude artifact — this is the standalone,
deployable version.

## What's inside

- `src/App.jsx` — the whole app (Discover, AI Matches, Tracker, Profile tabs)
- `api/match.js` — a serverless function that securely calls the Anthropic API
  (your API key lives here, on the server, never in the browser)
- `api/dev-server.js` — a tiny Express server so `/api/match` also works when
  you're developing locally with `npm run dev`
- Data persistence uses `localStorage`, so a user's profile and tracked
  scholarships stay on their own device/browser

## 1. Local setup

```bash
npm install
cp .env.example .env
# then edit .env and paste in a real Anthropic API key from console.anthropic.com
```

You need **two terminals** for local development (one for the frontend, one for the
local API server that stands in for Vercel's serverless functions):

```bash
# Terminal 1 — the API server (handles AI matching)
node api/dev-server.js

# Terminal 2 — the frontend
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Everything except AI
Matching will already work without any API key — that's the only feature that calls
out to Claude.

## 2. Deploying (recommended: Vercel)

Vercel auto-detects both the Vite frontend and the `api/` folder as serverless
functions — no `api/dev-server.js` needed in production, that file is dev-only.

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel will detect the Vite framework automatically. Leave build settings as default.
4. Before deploying, go to **Settings → Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your real key
5. Deploy. You'll get a live URL like `nexaai.vercel.app` (or attach your own domain
   under Settings → Domains).

## 3. Alternative: deploying on Render

Since you've deployed InternTrack on Render before, this works too, just split
into two services:

- **Static Site**: build command `npm run build`, publish directory `dist`
- **Web Service** (Node): a small Express app wrapping `api/match.js` as a real
  route (same code as `api/dev-server.js`, just running permanently instead of
  only for local dev), with `ANTHROPIC_API_KEY` set in Render's Environment tab

Point the frontend's `/api/match` fetch at the Web Service's URL instead of a
relative path if you split them into separate Render services.

## 4. Extending it

- **Multi-device persistence**: swap `safeGet`/`safeSet` in `App.jsx` for calls to
  Supabase, Firebase, or your own Express + SQLite backend (same pattern as
  InternTrack) instead of `localStorage`.
- **More scholarships**: edit the `SCHOLARSHIPS` array at the top of `App.jsx`.
  Keep the same shape (`id`, `title`, `levels`, `fields`, `funding`, `deadline`,
  `eligibility`, `link`, etc.) and everything else — filtering, matching,
  tracking — works automatically.
- **Auth**: if you want each student to have their own account and see their
  data on any device, add a lightweight auth layer (e.g. Clerk, Supabase Auth)
  before wiring up a real database.

## Notes

- Scholarship details (deadlines, eligibility, funding) shift often — the app
  includes a disclaimer reminding users to confirm details on each provider's
  official page.
- Keep your `.env` file out of git — `.gitignore` already excludes it.
