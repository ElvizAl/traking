"use server";

import { auth,} from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Tolong masukkan email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Tolong masukkan password" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return {error: "Oops, Ada yang salah saat login"}
    }

    return { error: "Internal Server Error" };
  }
}