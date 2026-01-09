# Actionable Issues List
**Generated:** January 9, 2025
**Status:** Ready for development backlog

---

## 🔴 CRITICAL - Must Fix Before Production

### 1. Remove Debug Console Logs
**File:** `src/app/admin/media/page.tsx`
**Lines:** 25, 34, 40, 49, 52, 63, 65, 71, 76, 85-101, 161-163, 211-213
**Action:** Remove or wrap in `process.env.NODE_ENV === 'development'` guard
**Priority:** URGENT - These will spam production console

```typescript
// Current (REMOVE):
console.log("🚀🚀🚀 MediaPage component rendering...");

// Or wrap:
if (process.env.NODE_ENV === 'development') {
  console.log("MediaPage component rendering...");
}
```

### 2. Add Visual Test Indicator Cleanup
**File:** `src/app/admin/media/page.tsx` (Lines 143-146)
**Action:** Remove the green "New code deployed" banner after verifying deployment
**Priority:** HIGH - This is temporary debugging code

```typescript
// REMOVE THIS BLOCK AFTER TESTING:
<div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-800 text-sm">
  ✓ New code deployed - CSS layout fixed
</div>
```

### 3. Add Error Boundaries
**Files to Create:**
- `src/app/error.tsx` - Root error boundary
- `src/app/admin/error.tsx` - Admin error boundary
- `src/app/(public)/error.tsx` - Public pages error boundary

**Template:**
```typescript
"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
```

### 4. Add Custom 404 Page
**File:** `src/app/not-found.tsx`
**Status:** Missing
**Action:** Create custom not-found page instead of default Next.js 404

```typescript
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-5xl font-display font-bold text-gray-900">404</h1>
      <p className="text-gray-600">Page not found</p>
      <a href="/" className="text-terracotta-600 hover:underline">
        Return home
      </a>
    </div>
  );
}
```

### 5. Fix Middleware Admin User Validation
**File:** `src/middleware.ts` (Lines 48-52, 65-69)
**Issue:** `.single()` can return error if no record found - not always validated
**Action:** Add explicit error checking

```typescript
// Current (RISKY):
const { data: adminUser } = await supabase
  .from("admin_users")
  .select("id, is_active")
  .eq("email", user.email)
  .single();

if (!adminUser || !adminUser.is_active) {
  // ...
}

// Better:
const { data: adminUser, error } = await supabase
  .from("admin_users")
  .select("id, is_active")
  .eq("email", user.email)
  .single();

if (error || !adminUser || !adminUser.is_active) {
  // Redirect to login
  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";
  url.searchParams.set("error", "unauthorized");
  return NextResponse.redirect(url);
}
```

---

## 🟠 HIGH PRIORITY - Should Fix Soon

### 6. File Upload Error Recovery
**File:** `src/app/admin/media/page.tsx` (Lines 84-102)
**Issue:** If one file fails, remaining files still attempt upload, state gets inconsistent
**Action:** Add break on error or pause loop

```typescript
// Current (RISKY):
setIsUploading(true);
for (const file of Array.from(files)) {
  if (file.size > 10 * 1024 * 1024) {
    alert(`${file.name} is too large.`);
    continue;  // ← Continues despite error
  }
  await uploadFile(file);
}

// Better:
setIsUploading(true);
for (const file of Array.from(files)) {
  if (file.size > 10 * 1024 * 1024) {
    alert(`${file.name} is too large. Upload stopped.`);
    break;  // ← Stop on error
  }
  const success = await uploadFile(file);
  if (!success) {
    alert("Upload failed. Stopped remaining uploads.");
    break;
  }
}
```

### 7. Complete Database Integration
**Files with TODO comments:**
- `src/app/(public)/recipes/[slug]/page.tsx` (Lines 115, 151) - Recipe fetching
- `src/app/(public)/category/[slug]/page.tsx` (Lines 178, 185) - Category fetching
- `src/app/admin/categories/page.tsx` (Lines 63, 69, 86) - Category CRUD
- `src/app/admin/recipes/new/page.tsx` (Line 169) - Recipe saving
- `src/app/api/reviews/route.ts` (Lines 54, 156) - Review storage
- `src/app/api/cron/instagram/route.ts` (Line 58) - Duplicate checking

**Action:** Replace demo data/commented code with actual Supabase calls

### 8. Remove Commented Code
**Files:**
- `src/app/layout.tsx` (Lines 4-5, 65-66) - Raptive ads comments
- `src/app/api/reviews/route.ts` - Commented Supabase code
- `src/app/api/cron/instagram/route.ts` - Commented code

**Action:** Remove after confirming no longer needed

### 9. Improve Clipboard Error Handling
**File:** `src/components/recipe/recipe-actions.tsx` (Lines 42-50)
**Action:** More descriptive error messages

```typescript
// Current:
try {
  await navigator.clipboard.writeText(url);
  // success
} catch {
  console.error("Copy failed");
  // No user feedback
}

// Better:
try {
  await navigator.clipboard.writeText(url);
  setCopied(url);
  setTimeout(() => setCopied(null), 2000);
} catch (error) {
  console.error("Copy failed:", error);
  alert("Failed to copy to clipboard. Please try again.");
}
```

---

## 🟡 MEDIUM PRIORITY - Nice to Have

### 10. Add Environment Variable for Raptive
**File:** `src/app/layout.tsx`
**Action:** Make Raptive site ID configurable

```typescript
const raptiveSiteId = process.env.NEXT_PUBLIC_RAPTIVE_SITE_ID;

// In layout:
{raptiveSiteId && <RaptiveScript siteId={raptiveSiteId} />}
```

### 11. Database Schema Mismatch
**Issue:** Schema has `media` table but code uses `media-library` storage bucket
**Files:**
- `supabase/migrations/001_initial_schema.sql`
- `src/app/admin/media/page.tsx`

**Action:** Clarify intent - are both needed or is one unused?

### 12. Unused Dependencies Check
**Files:** `package.json`
**Action:** Verify and consider removing:
- `date-fns` - Not visibly used in current code
- `clsx` - Using `cn` utility instead

---

## 📋 Cleanup Checklist

Before deployment to production:
- [ ] Remove all console.log statements from media page
- [ ] Remove visual test indicator (green box)
- [ ] Add error boundaries to key pages
- [ ] Add custom 404 page
- [ ] Fix middleware validation
- [ ] Add file upload error recovery
- [ ] Complete database integration (or remove demo mode)
- [ ] Remove all commented code
- [ ] Test error handling paths
- [ ] Run `npm audit` for security
- [ ] Test on actual mobile device
- [ ] Test file upload with large files
- [ ] Test with network throttling
- [ ] Verify all error boundaries are caught

---

## 📊 Issue Statistics

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 5 | Ready to fix |
| High | 4 | Ready to fix |
| Medium | 3 | Can defer |
| Low | 4 | Polish later |
| **TOTAL** | **16** | - |

---

## 🚀 Next Steps

1. **Immediate (Before deploy):**
   - Remove debug console logs
   - Remove test indicator
   - Add error boundaries

2. **Soon (This sprint):**
   - Fix middleware validation
   - Complete database integration
   - Add custom error pages

3. **Later (Next sprint):**
   - Clean up commented code
   - Optimize dependencies
   - Add monitoring/logging

---

## 💡 Key Insights

✅ **What's Working Well:**
- TypeScript typing is solid
- Zod validation is comprehensive
- Security practices are good (no XSS vulnerabilities)
- Component structure is clean
- Responsive design is solid (after CSS fix)

⚠️ **What Needs Work:**
- Debug code needs cleanup
- Database integration incomplete
- Error handling missing in some paths
- No error boundaries for graceful failures
- File upload error recovery needed

🎯 **Foundation is Strong** - Most issues are cleanup/completion tasks, not architectural problems.
