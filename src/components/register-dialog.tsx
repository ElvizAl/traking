"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpEmailAction } from "@/actions/signup-action"

export function RegisterDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.currentTarget);

    const { error } = await signUpEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("pendaftaran Berhasil Silahkan login");
      router.push("/");
      window.location.reload();
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
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300 mb-2">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Pilih username..."
              />
            </div>
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
                placeholder="Buat password..."
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r cursor-pointer from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" disabled={isPending}
            >
              Daftar ✨
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
