"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Instagram, Youtube, Facebook } from "lucide-react";

const navigation = {
  recipes: [
    { name: "All Recipes", href: "/recipes" },
    { name: "Mains", href: "/category/mains" },
    { name: "Pasta", href: "/category/pasta" },
    { name: "Chicken", href: "/category/chicken" },
    { name: "Soups", href: "/category/soups" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "mailto:fridasofiaeats@gmail.com" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/fridasofiaeats/",
      icon: Instagram,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@fridasofiaeats",
      icon: Youtube,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/fridasofiaeats",
      icon: Facebook,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@fridasofiaeats",
      // Using a custom TikTok icon since lucide doesn't have one
      icon: () => (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // Secret admin access: Triple-click the period after copyright year
  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Clear any existing timeout
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    // If 5 clicks within the timeout period, go to admin
    if (newCount >= 5) {
      setClickCount(0);
      router.push("/admin");
      return;
    }

    // Reset count after 2 seconds of no clicks
    clickTimeout.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <footer className="bg-cream-100 border-t border-cream-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-xl font-bold text-terracotta-600">
                Frida Sofia Eats
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Easy & delicious recipes for busy nights and real kitchens.
              Cooking is my love language.
            </p>
            {/* Social links */}
            <div className="mt-6 flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-terracotta-600 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Recipes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Recipes
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.recipes.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-terracotta-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-terracotta-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup placeholder */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Stay Connected
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Follow along on Instagram for the latest recipes and cooking tips!
            </p>
            <a
              href="https://www.instagram.com/fridasofiaeats/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 hover:text-terracotta-700 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @fridasofiaeats
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-cream-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Frida Sofia Eats
              <span
                onClick={handleSecretClick}
                className="cursor-default select-none"
                title=""
              >
                .
              </span>{" "}
              All rights reserved.
            </p>
            {/* Raptive ad disclosure - required for ad networks */}
            <p className="text-xs text-gray-400 text-center md:text-right max-w-md">
              This site contains affiliate links and ads. We may receive
              compensation for purchases made through these links.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
