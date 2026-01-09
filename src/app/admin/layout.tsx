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
      {/* Main content area - responsive padding/margin */}
      <div className="pl-64 md:pl-64 pl-0 pt-0 md:pt-0 pt-16">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
