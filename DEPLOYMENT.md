# BomBaySales@99 — deployment configuration

This repository is the only repository for the current BomBaySales@99 website.

- GitHub source: `BombayBoy007/bombay-sales99`
- Production branch: `main`
- Framework: Next.js
- Build: `npm run build`
- Node: 20.x
- Vercel region preference: Mumbai (`bom1`)
- Store data: `public/data/store.json`
- Owner editor: `/admin` with server-side password/session protection
- Owner persistence: GitHub Contents API through server-side `GITHUB_TOKEN`
- Required Vercel environment variables: `ADMIN_PASSWORD`, `SESSION_SECRET`, `GITHUB_TOKEN`

Do not use or deploy the separate `Bombay-sales-sales@1990` repository for this project.
