import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, FolderOpen, Star, Plus } from "lucide-react";

// Placeholder stats - will be replaced with Supabase queries
const stats = [
  { name: "Total Recipes", value: "0", icon: ChefHat, href: "/admin/recipes" },
  { name: "Categories", value: "10", icon: FolderOpen, href: "/admin/categories" },
  { name: "Reviews", value: "0", icon: Star, href: "/admin/recipes" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl">
      {/* Header - Responsive: stacked on mobile, horizontal on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's an overview of your site.
          </p>
        </div>
        <Button asChild className="sm:self-start">
          <Link href="/admin/recipes/new">
            <Plus className="h-4 w-4 mr-2" />
            New Recipe
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-terracotta-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/recipes/new">
                <ChefHat className="h-6 w-6" />
                <span>Create Recipe</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/categories">
                <FolderOpen className="h-6 w-6" />
                <span>Manage Categories</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/media">
                <Plus className="h-6 w-6" />
                <span>Upload Media</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Star className="h-6 w-6" />
                <span>View Live Site</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Guide */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Set up Supabase</h3>
                <p className="text-sm text-gray-600">
                  Run the migration file in your Supabase SQL editor to create the database tables.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Add your email to admin_users</h3>
                <p className="text-sm text-gray-600">
                  Insert your Google email into the admin_users table to enable login.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Create your first recipe</h3>
                <p className="text-sm text-gray-600">
                  Click "New Recipe" to start adding your delicious content!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
