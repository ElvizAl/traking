import { User } from "lucide-react"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { SignOut } from "@/components/signout"


export async function UserProfile() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-medium">Hai, {session?.user.name}! 👋</span>
        <SignOut />
      </div>
    </div>
  )
}
