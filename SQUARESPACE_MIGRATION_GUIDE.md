# Squarespace to Frida Sofia Eats Migration Guide

## Overview

This guide outlines the strategy for migrating existing recipes from the Squarespace site to the new Next.js + Supabase platform at fridasofiaeats.com.

---

## Migration Options

### Option 1: Manual Migration (Recommended for Quality)

**Best for:** Small to medium number of recipes (< 50)

**Process:**
1. Open each recipe on Squarespace
2. Copy/paste content into the new admin panel at `/admin/recipes/new`
3. Upload images from local backups or download from Squarespace
4. Review and publish each recipe

**Pros:**
- Highest quality result
- Opportunity to improve content, SEO, and formatting
- Natural content review process
- Can add new features (video links, categories) as you go

**Cons:**
- Time-intensive
- Manual effort required

**Estimated Time:** 5-10 minutes per recipe

---

### Option 2: Squarespace Export + Script Import

**Best for:** Large number of recipes (50+)

**Process:**

#### Step 1: Export from Squarespace
1. Go to Squarespace Settings > Advanced > Import/Export
2. Click "Export" to download your content as XML
3. This exports blog posts, pages, and basic content

#### Step 2: Create Import Script
Create a Node.js script to parse the XML and insert into Supabase:

```javascript
// scripts/import-squarespace.js
const { createClient } = require('@supabase/supabase-js');
const xml2js = require('xml2js');
const fs = require('fs');
const slugify = require('slugify');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for admin access
);

async function importRecipes() {
  // Read the Squarespace export
  const xml = fs.readFileSync('./squarespace-export.xml', 'utf8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);

  // Squarespace exports as WordPress XML format
  const items = result.rss.channel[0].item;

  for (const item of items) {
    // Skip non-recipe posts
    if (!item.title || !item.title[0]) continue;

    const title = item.title[0];
    const content = item['content:encoded']?.[0] || '';
    const pubDate = item.pubDate?.[0];

    // Parse content to extract ingredients/instructions
    // (This will need customization based on your content structure)
    const recipe = {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      description: extractDescription(content),
      intro_text: extractIntro(content),
      ingredients: parseIngredients(content),
      instructions: parseInstructions(content),
      status: 'draft', // Review before publishing
      created_at: pubDate ? new Date(pubDate) : new Date(),
    };

    const { error } = await supabase.from('recipes').insert(recipe);
    if (error) {
      console.error(`Failed to import: ${title}`, error);
    } else {
      console.log(`Imported: ${title}`);
    }
  }
}

// Helper functions to parse Squarespace content
// These will need customization based on your HTML structure
function extractDescription(html) {
  // Extract first paragraph as description
  const match = html.match(/<p[^>]*>(.*?)<\/p>/);
  return match ? match[1].replace(/<[^>]*>/g, '').slice(0, 200) : '';
}

function extractIntro(html) {
  // Extract intro paragraphs before ingredients
  // Customize based on your content structure
  return '';
}

function parseIngredients(html) {
  // Look for ingredient lists - customize based on your format
  // Example: looking for <ul> after "Ingredients" heading
  return [{ id: '1', name: '', items: [] }];
}

function parseInstructions(html) {
  // Look for numbered lists or steps
  return [{ id: '1', text: '' }];
}

importRecipes();
```

#### Step 3: Handle Images
Images need special handling:

```javascript
// scripts/migrate-images.js
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

async function migrateImage(imageUrl, fileName) {
  // Download from Squarespace
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('recipe-images')
    .upload(fileName, buffer, {
      contentType: 'image/jpeg',
    });

  if (!error) {
    const { data } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(fileName);
    return data.publicUrl;
  }
  return null;
}
```

---

### Option 3: Hybrid Approach (Recommended)

**Best for:** Most situations

**Process:**
1. Export Squarespace content as backup/reference
2. Prioritize your top 10-20 most popular recipes for manual migration
3. Use Google Analytics to identify high-traffic recipes
4. Manually migrate these first with full optimization
5. Import remaining recipes via script as drafts
6. Review and polish imported recipes over time

---

## Pre-Migration Checklist

### Before You Start
- [ ] Export all Squarespace content (Settings > Advanced > Import/Export)
- [ ] Download all images from Squarespace (Media library or site files)
- [ ] Document your current URL structure for redirects
- [ ] Note your top 20 recipes by traffic (Google Analytics)
- [ ] Backup everything

### Data to Migrate per Recipe
- [ ] Title
- [ ] Featured image
- [ ] Description/intro text
- [ ] Ingredients (with groupings if applicable)
- [ ] Instructions (numbered steps)
- [ ] Prep time, cook time, servings
- [ ] Categories/tags
- [ ] Video links (Instagram, YouTube, TikTok)
- [ ] Any recipe notes

---

## URL Redirects

### Setting Up Redirects

If your Squarespace URLs were like:
```
fridasofiaeats.com/blog/creamy-mushroom-pasta
```

And new URLs are:
```
fridasofiaeats.com/recipes/creamy-mushroom-pasta
```

Add redirects in `next.config.mjs`:

```javascript
const nextConfig = {
  async redirects() {
    return [
      // Redirect old blog URLs to new recipe URLs
      {
        source: '/blog/:slug',
        destination: '/recipes/:slug',
        permanent: true, // 301 redirect for SEO
      },
      // Add specific redirects for changed slugs
      {
        source: '/blog/old-recipe-name',
        destination: '/recipes/new-recipe-name',
        permanent: true,
      },
    ];
  },
};
```

---

## SEO Considerations

### Preserve Your SEO
1. **Keep URLs similar** - Use same slugs when possible
2. **Set up 301 redirects** - Critical for maintaining rankings
3. **Update meta tags** - Each recipe has meta_title and meta_description fields
4. **Submit new sitemap** - After migration, submit `/sitemap.xml` to Google Search Console
5. **Monitor rankings** - Watch Search Console for drops in the weeks after migration

### JSON-LD Schema
The new site automatically generates recipe schema for Google rich results. Ensure you fill in:
- Cook time and prep time
- Servings
- Complete ingredient lists
- Step-by-step instructions

---

## Image Migration Tips

### Image Optimization
Before uploading images:
1. Resize to max 1200px width (larger is unnecessary)
2. Compress using tools like TinyPNG or ImageOptim
3. Use WebP format when possible (better compression)
4. Keep file sizes under 200KB for fast loading

### Naming Convention
Use descriptive file names:
- Good: `creamy-mushroom-pasta-hero.jpg`
- Bad: `IMG_4521.jpg`

---

## Post-Migration Checklist

### Immediate
- [ ] Test all recipe pages load correctly
- [ ] Verify images display properly
- [ ] Check recipe schema in Google Rich Results Test
- [ ] Test print functionality
- [ ] Test search functionality
- [ ] Verify categories display correctly

### Within 1 Week
- [ ] Submit new sitemap to Google Search Console
- [ ] Update social media links to new site
- [ ] Update Instagram bio link
- [ ] Monitor for 404 errors in Search Console
- [ ] Check Google Analytics for traffic patterns

### Within 1 Month
- [ ] Compare traffic before/after migration
- [ ] Check search rankings for key recipes
- [ ] Gather user feedback
- [ ] Fix any reported issues

---

## Domain Cutover

### When Ready to Switch

1. **In Porkbun (your domain registrar):**
   - Update DNS to point to Vercel
   - Or add the domain in Vercel and follow their instructions

2. **In Vercel:**
   - Add custom domain `fridasofiaeats.com`
   - Vercel will provision SSL automatically

3. **In Supabase:**
   - Update Site URL to `https://fridasofiaeats.com`
   - Update Redirect URLs to `https://fridasofiaeats.com/auth/callback`

4. **In Google Cloud Console:**
   - Update OAuth redirect URIs to new domain

5. **DNS Propagation:**
   - Takes 24-48 hours for worldwide propagation
   - During this time, some users may see old site

---

## Support

If you run into issues during migration:
1. Check the browser console for errors
2. Check Vercel function logs for API errors
3. Verify Supabase RLS policies allow the operations
4. Test API endpoints directly using Postman or curl

---

## Timeline Suggestion

| Phase | Tasks | Duration |
|-------|-------|----------|
| Prep | Export content, download images, identify top recipes | 1-2 days |
| Priority Migration | Manually migrate top 20 recipes | 3-5 days |
| Bulk Import | Script import remaining recipes as drafts | 1 day |
| Review | Review and publish imported recipes | 1-2 weeks |
| Cutover | Switch domain, set up redirects | 1 day |
| Monitoring | Watch analytics and fix issues | 2-4 weeks |

**Total estimated time: 3-6 weeks** depending on content volume and quality goals.

---

## Questions?

The admin panel is at `/admin` (remember the secret: click the period after "Frida Sofia Eats" in the footer 5 times!).

Good luck with your migration!
