"use client"

import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserProfileProps {
  username: string
  onLogout: () => void
}

export function UserProfile({ username, onLogout }: UserProfileProps) {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-medium">Hai, {username}! 👋</span>
        <Button onClick={onLogout} variant="ghost" size="sm" className="text-slate-400 hover:text-red-400 ml-2">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
