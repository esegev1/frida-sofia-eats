import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Frida Sofia Eats",
  description: "Privacy policy for Frida Sofia Eats website",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-12">
          <strong>Effective Date:</strong> January 2, 2025
        </p>

        <div className="prose prose-lg prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Automatic Data Collection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The site gathers technical information through standard web technologies.
              Your Internet Protocol (IP) address, browser type, device information,
              pages visited, referring websites, and location data are collected via
              cookies and analytics tools to improve site performance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Voluntary Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Users may submit personal details through contact forms, comments, or
              account creation. This information serves specific purposes like responding
              to inquiries or managing user accounts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Advertising Partnership
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The site partners with Raptive (CMI Marketing, Inc.) for ad placement.
              Raptive independently collects data for advertising purposes, with detailed
              information available on their{" "}
              <a
                href="https://raptive.com/creator-advertising-privacy-statement/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta-600 hover:text-terracotta-700 underline"
              >
                privacy statement
              </a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The site employs cookies and web beacons to track preferences and serve
              targeted ads. Users can disable these through browser settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Analytics
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Google Analytics monitors site usage patterns. This information may include
              pages visited, time spent on the Site, referring websites, and approximate
              geographic location, but doesn&apos;t reveal personally identifiable details
              about individuals.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Third-Party Content
            </h2>
            <p className="text-gray-700 leading-relaxed">
              External advertisers and embedded content (videos, social posts) operate
              under separate privacy policies and may use their own tracking methods.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Affiliate Disclosures
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The site participates in affiliate marketing programs earning commissions
              on purchases made through provided links.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              No information is knowingly collected from users under 13. Parents should
              contact{" "}
              <a
                href="mailto:fridasofiaeats@gmail.com"
                className="text-terracotta-600 hover:text-terracotta-700 underline"
              >
                fridasofiaeats@gmail.com
              </a>{" "}
              if concerned.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Contact &amp; Updates
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Questions should be directed to{" "}
              <a
                href="mailto:fridasofiaeats@gmail.com"
                className="text-terracotta-600 hover:text-terracotta-700 underline"
              >
                fridasofiaeats@gmail.com
              </a>.
              Policy changes will be posted with updated effective dates.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
