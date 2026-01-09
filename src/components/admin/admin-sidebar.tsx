"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ChefHat,
  FolderOpen,
  Image,
  Instagram,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navigation menu items for admin panel
 * Each item includes name, href, and icon for visual representation
 */
const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Recipes", href: "/admin/recipes", icon: ChefHat },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Media", href: "/admin/media", icon: Image },
  { name: "Instagram", href: "/admin/instagram", icon: Instagram },
];

/**
 * AdminSidebar Component
 * Responsive sidebar for admin panel
 * - Desktop: Fixed sidebar on left
 * - Mobile: Toggleable drawer with menu button
 */
export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white border-b border-cream-200 h-16 flex items-center px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-cream-100 rounded-lg"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
        <Link href="/admin" className="ml-4 font-display text-lg font-bold text-terracotta-600">
          FSE Admin
        </Link>
      </div>

      {/* Mobile overlay - closes menu when clicked */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - fixed on desktop, drawer on mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-cream-200 flex flex-col transition-transform duration-200",
          "md:translate-x-0", // Always visible on desktop
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full", // Toggle on mobile
          "md:top-0 top-16" // Below mobile header on mobile
        )}
      >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-cream-200">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-terracotta-600">
            FSE Admin
          </span>
        </Link>
      </div>

      {/* Navigation menu - shows all admin sections */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)} // Close mobile menu on navigation
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-terracotta-50 text-terracotta-700"
                  : "text-gray-600 hover:bg-cream-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section - quick actions and logout */}
      <div className="p-4 border-t border-cream-200 space-y-2">
        {/* Link to view public site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-cream-100 hover:text-gray-900 transition-colors"
        >
          <ExternalLink className="h-5 w-5" />
          View Site
        </a>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
      </aside>
    </>
  );
}
