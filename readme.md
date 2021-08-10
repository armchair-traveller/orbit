# Orbit

**TODO**: Convert to stack in `/orbit` from React/Mongo/Node to Svelte/Fauna/CFW

## Setup

- `/api` folder contains cloudflare worker code. `wrangler publish` while inside it.
  - `wrangler put` your `ORBIT_JWT_SECRET` (random string) & `ORBIT_FAUNA_SECRET` (FaunaDB server token)
- `.env.example` for app's frontend URL env variables. Fill them in and rename to `.env.local` for dev purposes (only need the the `VITE_DEV_API_URL`), use Cloudflare Pages environment variables for production (only need `VITE_API_URL`)
