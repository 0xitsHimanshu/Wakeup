import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect to get started if not logged in
  if (!session || !session.user) {
    redirect("/getstarted");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, {session.user.name?.split(" ")[0]}!
            </p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </div>

        {/* User Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Session Status</CardTitle>
              <CardDescription>Current login information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Active Session
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <p>Status: Authenticated ✓</p>
                <p className="mt-1">Provider: Google</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Help & Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
            <CardDescription>Raw session information for debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-xs">
              {JSON.stringify(session, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
