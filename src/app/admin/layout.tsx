import { AdminSidebar } from "@/components/admin/admin-sidebar";

/**
 * Admin Layout
 * Responsive layout with sidebar on desktop, drawer on mobile
 * - Desktop: 64px (w-64) sidebar on left, main content adjusted with padding
 * - Mobile: Top navigation bar with menu toggle
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <AdminSidebar />
      {/* Main content area - responsive padding/margin
        Mobile: pl-0 (no left padding), pt-16 (top padding for mobile header)
        Desktop (md:): pl-64 (padding for sidebar), pt-0 (no top padding needed)
        Note: Classes must be ordered with mobile defaults first, then responsive overrides */}
      <div className="pl-0 pt-16 md:pl-64 md:pt-0">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
