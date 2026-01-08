import Script from "next/script";

interface RaptiveScriptProps {
  /** Your Raptive site ID (provided after approval) */
  siteId?: string;
}

/**
 * Raptive ad script component.
 *
 * Add this to your root layout after being approved by Raptive.
 * They will provide you with a specific site ID and script URL.
 *
 * Requirements for Raptive approval:
 * - 100,000+ monthly pageviews
 * - Original content
 * - Brand-safe content
 *
 * Apply at: https://raptive.com/apply/
 */
export function RaptiveScript({ siteId }: RaptiveScriptProps) {
  // Only load in production and when siteId is provided
  if (process.env.NODE_ENV !== "production" || !siteId) {
    return null;
  }

  return (
    <Script
      id="raptive-ads"
      strategy="lazyOnload"
      src={`//ads.raptive.com/${siteId}/raptive.js`}
    />
  );
}
