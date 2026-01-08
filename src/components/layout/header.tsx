"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes" },
  { name: "About", href: "/about" },
];

const categories = [
  { name: "Mains", href: "/category/mains" },
  { name: "Pasta", href: "/category/pasta" },
  { name: "Chicken", href: "/category/chicken" },
  { name: "Soups", href: "/category/soups" },
  { name: "Appetizers", href: "/category/appetizers" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80 border-b border-cream-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-terracotta-600">
                Frida Sofia Eats
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-terracotta-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-terracotta-600 transition-colors flex items-center gap-1">
                Categories
                <svg
                  className="w-4 h-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream-100 hover:text-terracotta-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="border-t border-cream-200 mt-2 pt-2">
                    <Link
                      href="/recipes"
                      className="block px-4 py-2 text-sm font-medium text-terracotta-600 hover:bg-cream-100"
                    >
                      View All Recipes →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Search button */}
            <Link
              href="/search"
              className="text-gray-600 hover:text-terracotta-600 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>

            {/* Social links - desktop only */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="https://www.instagram.com/fridasofiaeats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-terracotta-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@fridasofiaeats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-terracotta-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="space-y-1 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-gray-700 hover:text-terracotta-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-cream-200 pt-4 mt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categories
              </p>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block py-2 text-base text-gray-600 hover:text-terracotta-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-cream-200 pt-4 mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/fridasofiaeats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-terracotta-600 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@fridasofiaeats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-terracotta-600 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
