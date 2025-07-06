"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export const SignOut = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    async function handleClick() {
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse: () => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    toast.success("Sampai Jumpa Lagi")
                    router.push("/")
                    window.location.reload();
                }
            }
        })
    }


    return (
        <Button onClick={handleClick} variant="ghost" size="sm" className="text-slate-400 cursor-pointer hover:text-red-400 ml-2" disabled={isPending}>
          <LogOut className="w-4 h-4" />
        </Button>
    )
}