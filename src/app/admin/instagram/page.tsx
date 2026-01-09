"use client";

// Prevent static prerendering - this is a dynamic admin page
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Instagram, CheckCircle, AlertCircle, RefreshCw, Loader2 } from "lucide-react";

export default function InstagramPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    message: string;
    results?: Array<{ title: string; postId: string }>;
  } | null>(null);

  // Check if env vars are likely configured (can't actually check from client)
  const isConnected = false;

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    try {
      const response = await fetch("/api/cron/instagram", {
        method: "POST",
      });

      const data = await response.json();
      setSyncResult({
        success: response.ok,
        message: data.message || data.error,
        results: data.results,
      });
    } catch (error) {
      setSyncResult({
        success: false,
        message: "Failed to sync. Check console for details.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Instagram Integration
          </h1>
          <p className="text-gray-600 mt-1">
            Auto-create recipe drafts from your Instagram posts
          </p>
        </div>
        <Button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="bg-terracotta-500 hover:bg-terracotta-600"
        >
          {isSyncing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </>
          )}
        </Button>
      </div>

      {/* Sync Result */}
      {syncResult && (
        <Card className={`mb-6 ${syncResult.success ? "bg-green-50" : "bg-red-50"}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {syncResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              )}
              <div>
                <p className={syncResult.success ? "text-green-700" : "text-red-700"}>
                  {syncResult.message}
                </p>
                {syncResult.results && syncResult.results.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm">
                    {syncResult.results.map((r) => (
                      <li key={r.postId} className="text-green-600">
                        Created draft: {r.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700 font-medium">Connected</span>
              <Badge variant="default" className="bg-green-500">Active</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-amber-700 font-medium">Not Connected</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">Setup Required</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Create a Meta Developer App
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Go to{" "}
                  <a
                    href="https://developers.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta-600 hover:underline"
                  >
                    developers.facebook.com
                  </a>{" "}
                  and create a new app with Instagram Graph API access.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Connect Instagram Business Account
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Link your Instagram account to a Facebook Page and connect it
                  to your Meta app.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Generate Long-Lived Access Token
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Generate an access token with <code className="bg-gray-100 px-1 rounded">instagram_basic</code> and{" "}
                  <code className="bg-gray-100 px-1 rounded">pages_read_engagement</code> permissions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Add to Environment Variables
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add the following to your Vercel environment:
                </p>
                <div className="mt-2 bg-gray-900 rounded-lg p-3 text-sm font-mono">
                  <p className="text-green-400">INSTAGRAM_ACCESS_TOKEN=your_token</p>
                  <p className="text-green-400">INSTAGRAM_USER_ID=your_user_id</p>
                  <p className="text-green-400">CRON_SECRET=random_secret</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram Access Token
            </label>
            <Input
              type="password"
              placeholder="Set in INSTAGRAM_ACCESS_TOKEN env var"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Stored securely in environment variables
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram User ID
            </label>
            <Input
              placeholder="Set in INSTAGRAM_USER_ID env var"
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-cream-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Once connected, a cron job runs every 2 hours to check for new
              Instagram posts. When a new post is detected:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500">1.</span>
                Posts with recipe-related keywords are identified
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500">2.</span>
                A draft recipe is created with the caption as the description
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500">3.</span>
                The post image is set as the featured image
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500">4.</span>
                The Instagram post URL is linked in the recipe
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500">5.</span>
                You can then edit the draft to add ingredients and instructions
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
