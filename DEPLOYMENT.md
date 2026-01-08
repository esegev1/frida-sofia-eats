# Deployment Guide

Complete guide to deploying Frida Sofia Eats to production.

## Prerequisites

- [x] GitHub repository created
- [x] Vercel account (free tier)
- [x] Supabase project created
- [x] Domain registered (Porkbun: fridasofiaeats.com)

---

## 1. Supabase Setup

### Create Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to your users (e.g., East US)
3. Save the project URL and anon key

### Run Database Migration
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Run the migration
4. Verify tables were created in Table Editor

### Configure Authentication
1. Go to Authentication > Providers
2. Enable Google OAuth:
   - Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

### Add Admin User
```sql
INSERT INTO admin_users (email, is_active)
VALUES ('frida@example.com', true);
```

### Create Storage Buckets
1. Go to Storage
2. Create bucket: `recipe-images` (public)
3. Create bucket: `media-library` (public)

---

## 2. Vercel Deployment

### Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select "Next.js" as framework preset

### Environment Variables
Add these in Vercel project settings > Environment Variables:

```
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL (Required)
NEXT_PUBLIC_SITE_URL=https://fridasofiaeats.com

# Instagram Integration (Optional - for auto-drafts)
INSTAGRAM_ACCESS_TOKEN=your-long-lived-token
INSTAGRAM_USER_ID=your-instagram-user-id

# Cron Security (Required if using Instagram)
CRON_SECRET=generate-a-random-string

# Raptive Ads (After approval)
# RAPTIVE_SITE_ID=your-raptive-id
```

### Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Test at your-project.vercel.app

---

## 3. Domain Configuration (Porkbun → Vercel)

### In Vercel
1. Go to Project Settings > Domains
2. Add `fridasofiaeats.com`
3. Add `www.fridasofiaeats.com`
4. Copy the DNS values shown

### In Porkbun
1. Go to Domain Management > DNS Records
2. Delete existing A/CNAME records for @ and www
3. Add new records:

| Type  | Host | Value                    |
|-------|------|--------------------------|
| A     | @    | 76.76.21.21             |
| CNAME | www  | cname.vercel-dns.com    |

4. Wait for DNS propagation (5-30 minutes)

### Verify
1. Visit https://fridasofiaeats.com
2. Confirm HTTPS is working
3. Check www redirects properly

---

## 4. Instagram API Setup (Optional)

### Create Meta App
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create new app (Business type)
3. Add Instagram Graph API product

### Connect Account
1. Ensure Instagram is a Business/Creator account
2. Connect Instagram to a Facebook Page
3. Add the Facebook Page to your Meta app

### Get Access Token
1. Go to Graph API Explorer
2. Select your app
3. Add permissions: `instagram_basic`, `pages_read_engagement`
4. Generate long-lived token (60 days)
5. Add to Vercel environment variables

### Token Refresh
Long-lived tokens expire after 60 days. Set a reminder to refresh:
```
GET https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={current_token}
```

---

## 5. Raptive Ads Setup

### Apply
1. Go to [raptive.com/apply](https://raptive.com/apply)
2. Requirements: 100k+ monthly pageviews
3. Wait for approval (1-2 weeks)

### After Approval
1. Get your Raptive site ID
2. Update `src/app/layout.tsx`:
   - Uncomment the RaptiveScript import
   - Uncomment the component and add your site ID
3. Redeploy

---

## 6. Launch Checklist

### Pre-Launch
- [ ] All environment variables configured
- [ ] Database migration complete
- [ ] Admin user added
- [ ] Storage buckets created
- [ ] Google OAuth working
- [ ] Domain DNS configured
- [ ] SSL certificate active

### Content
- [ ] Initial recipes added via admin panel
- [ ] Categories created
- [ ] About page content updated
- [ ] Social links verified

### Testing
- [ ] Homepage loads correctly
- [ ] Recipe pages display properly
- [ ] Search functionality works
- [ ] Print/copy buttons work
- [ ] Review submission works
- [ ] Admin login works
- [ ] Recipe editor saves correctly
- [ ] Image uploads work
- [ ] Mobile responsive

### SEO
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] JSON-LD schema on recipe pages
- [ ] Meta tags rendering correctly
- [ ] Submit sitemap to Google Search Console

### Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] No console errors

---

## 7. Post-Launch

### Monitor
- Set up Vercel Analytics (free)
- Monitor Supabase usage dashboard
- Check error logs in Vercel

### Backups
- Enable Supabase Point-in-Time Recovery
- Consider database backups for important data

### Maintenance
- Keep dependencies updated
- Refresh Instagram token every 60 days
- Monitor Raptive earnings

---

## Quick Commands

```bash
# Local development
npm run dev

# Production build test
npm run build && npm start

# Type checking
npm run lint

# Deploy (automatic via git push)
git push origin main
```

---

## Troubleshooting

### Build Fails
- Check environment variables are set
- Ensure all dependencies installed
- Review build logs in Vercel

### Auth Not Working
- Verify Google OAuth credentials
- Check redirect URLs match
- Confirm admin_users table has your email

### Images Not Loading
- Check Supabase storage bucket is public
- Verify image URLs are correct
- Check next.config.mjs remotePatterns

### Instagram Sync Not Working
- Verify access token is valid
- Check CRON_SECRET matches
- Review cron logs in Vercel
