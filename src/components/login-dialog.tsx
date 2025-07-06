"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInEmailAction } from "@/actions/signin-action"


export function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.currentTarget);

    const { error } = await signInEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Login Berhasil. Selamat Datang Kembali");
      router.push("/");
      window.location.reload();
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
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-300 mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Masukkan email..."
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-slate-300 mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Masukkan password..."
              />
            </div>
            <Button
              className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600" disabled={isPending}
            >
              Login ✨
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
