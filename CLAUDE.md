# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

No test suite is configured in this repo.

## Before writing Next.js code

`node_modules/next` is version 16.2.6, newer than this model's training data and per [AGENTS.md](AGENTS.md) may include breaking API/convention changes. Check `node_modules/next/dist/docs/01-app/` before relying on prior knowledge of App Router conventions (routing, data fetching, `params`/`searchParams` typing, etc.) — e.g. `params` in dynamic routes is already a `Promise` unwrapped with `use()`, see [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx).

## Architecture

This is a marketing site + blog for a translation agency (Mnemonic), built on Next.js App Router, React 19, and Tailwind v4.

**Every page is a client component** (`'use client'`), including the blog list/detail pages and the admin panel. There is no server-side data fetching or static generation for blog content — pages fetch from Supabase in `useEffect` on mount. Keep this pattern consistent unless deliberately migrating to server components/SSR.

**Blog content is entirely Supabase-backed**, not filesystem-based:
- Table `blog_posts` — published posts (fetched in [app/blog/page.tsx](app/blog/page.tsx), [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx), [app/components/latestBlogPosts.tsx](app/components/latestBlogPosts.tsx))
- Table `blog_drafts` — autosaved drafts (every 30s) plus manual save, managed from [app/admin/page.tsx](app/admin/page.tsx)
- Post content is authored in Markdown, rendered via `marked`, then sanitized with `DOMPurify` before `dangerouslySetInnerHTML` — always keep the sanitize step when touching this render path.
- `public/blog-posts.json` is stale/unused test data left over from before the Supabase migration; the app never reads it.

**Auth** ([lib/authContext.tsx](lib/authContext.tsx)) wraps Supabase auth in a React context (`AuthProvider`/`useAuth`), used only to gate [app/admin/page.tsx](app/admin/page.tsx). It also enforces a 30-minute client-side inactivity auto-logout. [lib/ratelimit.ts](lib/ratelimit.ts) is an in-memory (non-persistent, per-instance) login rate limiter — it will not hold state correctly across multiple serverless instances.

**Nav visibility** ([lib/navContext.tsx](lib/navContext.tsx)) is a global context (`NavProvider`/`useNavThreshold`) that each page sets on mount to control the scroll offset at which the sticky nav ([app/components/navigation.tsx](app/components/navigation.tsx)) hides/shows. When adding a new page, set an appropriate `scrollThreshold` in a `useEffect`, matching the pattern in existing pages (e.g. `400` for content pages, `800`/full-screen for the hero-driven home page).

**Contact form** ([app/contact/page.tsx](app/contact/page.tsx)) posts `FormData` (including an optional file attachment, validated client-side for size/type) to [app/api/contact/route.ts](app/api/contact/route.ts), which sends two emails via Resend: one to the agency inbox and a confirmation to the customer.

**Security headers** are set centrally in [middleware.ts](middleware.ts) (CSP, HSTS, X-Frame-Options, etc.) rather than in `next.config.ts`. The CSP's `connect-src` is scoped to `'self'` and `https://*.supabase.co`; extend it there if adding new external services.

## Known issue

[app/api/contact/route.ts](app/api/contact/route.ts) has a Resend API key hardcoded in source (also present in git history) instead of reading `process.env.RESEND_API_KEY`, even though that variable is already defined in `.env.local`. Treat this key as compromised — flag it to the user before assuming it's safe to reuse or leave in place.
