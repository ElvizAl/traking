"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface LoginDialogProps {
  onLogin: (username: string) => void
}

export function LoginDialog({ onLogin }: LoginDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  const handleLogin = () => {
    if (loginForm.username && loginForm.password) {
      onLogin(loginForm.username)
      setIsOpen(false)
      setLoginForm({ username: "", password: "" })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
          🔐 Login
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="text-center bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Login 🔐
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-slate-300">
              Username
            </Label>
            <Input
              id="username"
              value={loginForm.username}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Masukkan username..."
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Masukkan password..."
            />
          </div>
          <Button
            onClick={handleLogin}
            disabled={!loginForm.username || !loginForm.password}
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
          >
            Login ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
