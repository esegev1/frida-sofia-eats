# Frida Sofia Eats - Project Summary

## Overview
Recipe blog for Instagram creator [@fridasofiaeats](https://www.instagram.com/fridasofiaeats/) (207K followers), replacing the current Squarespace site. Handles ~100k monthly visits.

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 14 (App Router) | React-based, SSR/SSG for SEO |
| Database | PostgreSQL on Supabase | Free tier, real-time capabilities |
| Hosting | Vercel (free tier) | Optimized for Next.js |
| Auth | Google OAuth via Supabase | Admin whitelist approach |
| Styling | Tailwind CSS 3.4 | Custom color palette |
| Domain | Porkbun → Vercel DNS | Keep domain at Porkbun |

## Key Decisions

### 1. CMS Approach
**Decision:** Custom Admin Panel (not Sanity/Contentful)
- Full control over features
- No third-party costs
- Direct Instagram webhook integration

### 2. Database
**Decision:** Supabase PostgreSQL
- Free tier sufficient for current traffic
- Built-in auth if needed
- Row Level Security for data protection
- Full-text search for recipes

### 3. Design Direction
**Decision:** "Modern Farmhouse meets Editorial Food Magazine"
- Photography-forward (no emojis)
- Warm cream backgrounds (#FFFBF7)
- Terracotta accent color (#E85D3B)
- Playfair Display for headings
- 4-column recipe grid on desktop

### 4. Image Hosting
**Decision:** Supabase Storage
- Public buckets for recipe images
- Integrated with database
- No additional CDN cost

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── (public)/                   # Public routes (with header/footer)
│   ├── admin/                      # Admin panel (protected)
│   ├── auth/                       # Authentication
│   └── api/                        # API routes
├── components/
│   ├── ui/                         # Base components (Button, Card, etc.)
│   ├── layout/                     # Header, Footer
│   ├── recipe/                     # Recipe-specific components
│   └── admin/                      # Admin components
├── lib/
│   ├── supabase/                   # Supabase clients
│   ├── utils/                      # Utilities (cn, etc.)
│   └── validators/                 # Zod schemas
├── hooks/                          # React hooks
└── types/                          # TypeScript types
```

## Database Schema

**Core Tables:**
- `recipes` - All recipe data (ingredients as JSONB, instructions as JSONB)
- `categories` - Recipe categories (Pasta, Chicken, etc.)
- `recipe_categories` - Many-to-many junction table
- `reviews` - Anonymous user reviews (1-5 stars)
- `admin_users` - Email whitelist for admin access
- `media` - Image library
- `newsletter_subscribers` - Future newsletter feature
- `instagram_webhook_log` - Instagram automation logs

**Key Features:**
- Full-text search on recipes
- Row Level Security enabled
- Auto-updating timestamps

## Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database (run in Supabase SQL Editor)
# Migration file: supabase/migrations/001_initial_schema.sql

# Git
git add .
git commit -m "message"
git push

# Deployment (Vercel)
vercel                   # Deploy preview
vercel --prod            # Deploy to production
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Instagram (for auto-draft feature)
INSTAGRAM_ACCESS_TOKEN=your-token
INSTAGRAM_USER_ID=your-user-id

# Cron
CRON_SECRET=random-secret

# Site
NEXT_PUBLIC_SITE_URL=https://fridasofiaeats.com
```

## Implementation Phases

- [x] **Phase 1: Foundation** - Project setup, database schema, UI components
- [x] **Phase 2: Admin Panel** - Auth, recipe editor, media library
- [x] **Phase 3: Public Site** - Recipe pages, category pages, search
- [x] **Phase 4: Engagement** - Reviews system, dynamic sitemap, robots.txt
- [x] **Phase 5: Monetization** - Raptive ads, Instagram automation
- [x] **Phase 6: Launch** - Deployment guide, DNS docs, launch checklist

## Pages Built

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, categories, featured recipes |
| `/recipes` | Recipe listing with category filter tabs |
| `/recipes/[slug]` | Recipe detail with print/copy, JSON-LD schema |
| `/category/[slug]` | Category pages with hero and filtered recipes |
| `/search` | Client-side search with suggestions |
| `/admin` | Dashboard (protected) |
| `/admin/recipes` | Recipe list |
| `/admin/recipes/new` | Full recipe editor |
| `/admin/categories` | Category management |
| `/admin/media` | Media library |
| `/admin/instagram` | Instagram settings with manual sync |
| `/auth/login` | Google OAuth login |
| `/api/reviews` | Review submission/fetching API |
| `/api/cron/instagram` | Instagram polling cron job |
| `/sitemap.xml` | Dynamic sitemap |
| `/robots.txt` | SEO robots file |

## Brand Guidelines

- **Voice:** Warm, approachable, family-focused ("cooking is my love language")
- **Colors:** Cream (#FFFBF7), Terracotta (#E85D3B), Sage accents
- **Typography:** Playfair Display (headings), Inter (body)
- **Imagery:** Large food photos, natural lighting, homey feel

## Links

- Instagram: https://www.instagram.com/fridasofiaeats/
- Current Site: https://fridasofiaeats.com
- Design Inspiration: https://pinchofyum.com/

---

*Last updated: January 2025*
