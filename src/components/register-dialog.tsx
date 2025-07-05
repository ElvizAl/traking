"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface RegisterDialogProps {
  onRegister: (username: string) => void
}

export function RegisterDialog({ onRegister }: RegisterDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleRegister = () => {
    if (
      registerForm.username &&
      registerForm.email &&
      registerForm.password &&
      registerForm.password === registerForm.confirmPassword
    ) {
      onRegister(registerForm.username)
      setIsOpen(false)
      setRegisterForm({ username: "", email: "", password: "", confirmPassword: "" })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          ✨ Daftar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Daftar Akun Baru ✨
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reg-username" className="text-slate-300">
              Username
            </Label>
            <Input
              id="reg-username"
              value={registerForm.username}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, username: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Pilih username..."
            />
          </div>
          <div>
            <Label htmlFor="reg-email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="reg-email"
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Masukkan email..."
            />
          </div>
          <div>
            <Label htmlFor="reg-password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="reg-password"
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Buat password..."
            />
          </div>
          <div>
            <Label htmlFor="reg-confirm-password" className="text-slate-300">
              Konfirmasi Password
            </Label>
            <Input
              id="reg-confirm-password"
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Ulangi password..."
            />
          </div>
          {registerForm.password &&
            registerForm.confirmPassword &&
            registerForm.password !== registerForm.confirmPassword && (
              <p className="text-red-400 text-xs">Password tidak sama!</p>
            )}
          <Button
            onClick={handleRegister}
            disabled={
              !registerForm.username ||
              !registerForm.email ||
              !registerForm.password ||
              registerForm.password !== registerForm.confirmPassword
            }
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            Daftar ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
