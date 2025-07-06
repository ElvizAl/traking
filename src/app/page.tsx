import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginDialog } from "@/components/login-dialog"
import { RegisterDialog } from "@/components/register-dialog"
import { StatsCards } from "@/components/stats-card"
import { SearchBar } from "@/components/search-bar"
import { EntryCard } from "@/components/entry-card"
import { AddEntryDialog } from "@/components/add-entry-dialog"
import { EditEntryDialog } from "@/components/edit-entry-dialog"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { UserProfile } from "@/components/user-profile"


export default async function AnimeTracker() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">
            KomikTracker ✨
          </h1>
          <p className="text-slate-400 text-sm">Catat progress anime & manga kamu</p>
        </div>

        {/* Login/Register or User Profile */}
        {!session ? (
          <div className="flex gap-2 justify-center mb-6">
            <LoginDialog />
            <RegisterDialog />
          </div>
        ) : (
          <UserProfile />
        )}
      </div>
    </div>
  )
}
