import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// Uncomment after Raptive approval:
// import { RaptiveScript } from "@/components/ads/raptive-script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Frida Sofia Eats | Easy & Delicious Recipes",
    template: "%s | Frida Sofia Eats",
  },
  description:
    "Delicious, family-friendly recipes and cooking tips. Easy meal ideas for busy nights and real kitchens. Cooking is my love language.",
  keywords: [
    "recipes",
    "easy recipes",
    "family recipes",
    "weeknight dinners",
    "comfort food",
    "pasta recipes",
    "chicken recipes",
  ],
  authors: [{ name: "Frida Sofia" }],
  creator: "Frida Sofia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fridasofiaeats.com",
    siteName: "Frida Sofia Eats",
    title: "Frida Sofia Eats | Easy & Delicious Recipes",
    description:
      "Delicious, family-friendly recipes and cooking tips. Easy meal ideas for busy nights and real kitchens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frida Sofia Eats | Easy & Delicious Recipes",
    description:
      "Delicious, family-friendly recipes and cooking tips. Easy meal ideas for busy nights and real kitchens.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        {/* Uncomment after Raptive approval and add your site ID: */}
        {/* <RaptiveScript siteId="YOUR_RAPTIVE_SITE_ID" /> */}
      </body>
    </html>
  );
}
