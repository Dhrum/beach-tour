# 🌊 Beach Tour — Sylt Coastline Master Plan

An interactive tour guide, day-by-day itinerary, planner and **file-based commenting**
website for a three-day, twelve-beach trip on Germany's Sylt island.

## Features

- **Static plan** — hero, trip overview, 3-day interactive itinerary, Frankfurt→Hamburg→Sylt train connections,
  embedded map, and a filterable directory of all 12 beaches & spots.
- **Interactive planner** — packing checklist + quick budget (saved in your browser).
- **Comments per section** — anyone can post a note with just a **name + comment**.
  Comments are stored on disk as JSON files in `data/comments/` (one file per section).

## Run

```bash
npm install
npm start        # → http://localhost:3000
```

Use `npm run dev` for auto-reload while editing the server.

## Trip at a glance

| Day | Focus |
|-----|--------|
| **Jun 4** | Depart Frankfurt Hbf **05:20** → Hamburg → Westerland (~18:00–19:00), settle in base |
| **Jun 5** | Full island beach day — all 12 stops via SVG buses from Westerland ZOB |
| **Jun 6** | Morning on the south tip until **12:30**, return to Frankfurt via Hamburg |

Base: **Westerland** (main hub). Distances and bus times are from **Westerland Hauptstrand**.

## How comments are stored

Storage is **adaptive** (see [lib/store.js](lib/store.js)):

- **Locally** → JSON files in `data/comments/<section>.json`.
- **On Vercel** → Upstash Redis, when the REST env vars are present.

Either way, names and comment text are HTML-escaped on save.

## Deploy free on Vercel (with persistent comments)

Vercel's filesystem is read-only, so the comments need a tiny free database.
This project auto-detects **Upstash Redis** and uses it when available.

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo → **Deploy**.
   (Zero config: Vercel serves `/public` statically and runs `/api` as functions.)
3. In the project, open the **Storage** tab → **Create Database** → **Upstash Redis**
   (free tier, no card) → connect it to the project. This injects
   `KV_REST_API_URL` / `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_*`) automatically.
4. **Redeploy** so the function picks up the env vars. Comments now persist for everyone.

> Without a database connected, the site still loads fully — but posting a comment
> will fail, since serverless functions can't write to disk.

## Project layout

```
server.js                  Express server for local dev (GET/POST /api/comments/:section)
api/comments/[section].js  Vercel serverless function (same API, used in production)
lib/store.js               Adaptive comment storage (Redis on Vercel, files locally)
public/index.html          The page
public/css/styles.css      Coastal theme & components
public/js/app.js           Beaches/carousels, tabs, filters, planner, comment widgets
data/comments/             Saved comment files locally (git-ignored)
```

## API

| Method | Route                       | Body                  |
|--------|-----------------------------|-----------------------|
| GET    | `/api/comments/:section`    | —                     |
| POST   | `/api/comments/:section`    | `{ name, comment }`   |
