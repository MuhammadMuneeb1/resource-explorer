Resource Explorer – Rick & Morty

Build: Next.js App Router + TypeScript + Tailwind + React Query

What it does
- Lists Rick & Morty characters with pagination
- URL-synced search, filter (status, gender), sort (name), and favorites-only view
- Detail page with image, metadata, local note, and favorite toggle
- Favorites persisted in localStorage, theme toggle (light/dark)
- Fast UX with React Query caching, abortable requests, loading skeletons, and error retry

Getting started
1. Install dependencies
```bash
npm install
```
2. Run dev server
```bash
npm run dev
```
3. Build
```bash
npm run build && npm start
```

Tech decisions
- App Router with server detail route keeps bundle small and allows streaming where useful
- React Query handles caching, background refetch, and cancellation via fetch AbortSignal
- URL is source of truth using next/navigation hooks; state is derived from search params
- Tailwind for small, focused UI components; no heavy UI kit
- Favorites and notes use localStorage for persistence with simple providers/hooks

Tricky bits addressed
- URL-sync for q/status/gender/sort/page/fav, shareable and reload-safe
- Abort on change: React Query supplies AbortSignal to fetchers
- Empty states, skeletons, and retry button on errors
- Back/forward keeps list state; pagination and filters live in URL


Project structure
```
src/
  app/               Next.js app routes
  components/        UI, list, detail, notes, favorites
  hooks/             small reusable hooks
  lib/               API types and fetchers
  providers/         Theme, React Query, Favorites
```
