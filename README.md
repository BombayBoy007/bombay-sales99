# BomBay Sales99 - Affiliate Storefront

A sleek, 3D glassmorphism affiliate storefront built with Next.js. Features 8 themed sections with real-time editable content via author dashboard.

## Features

- 3D glassmorphism design
- 8 themed sections
- Swipe-friendly product scroller
- Editable author dashboard with password gating
- Mobile responsive
- Vercel-ready setup

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Open admin editor

Use a password in the URL:

```text
http://localhost:3000/?admin=BombaySales99@2026
```

You can also set a custom password in Vercel environment variables:

```text
NEXT_PUBLIC_ADMIN_PASSWORD=your-secret-password
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import into Vercel.
3. Add environment variable `NEXT_PUBLIC_ADMIN_PASSWORD` in the project settings.
4. Deploy.

## Notes

- Replace the placeholder affiliate links and product image URLs.
- Use the admin panel to update content in real time.
- The site stores edits locally in the browser for quick author updates.
- For true cross-device real-time syncing to all visitors, add a backend like Supabase or Vercel KV.
