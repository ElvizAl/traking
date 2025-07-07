"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/db/prisma"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import type { Category, Status } from "@/generated/prisma"

// Helper function to get current user
async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  return session.user
}

// Generate random cover color
function generateCoverColor() {
  const colors = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Create new entry
export async function createEntryAction(formData: FormData) {
  try {
    const user = await getCurrentUser()

    const title = String(formData.get("title"))
    const category = String(formData.get("category")) as Category
    const progress = Number(formData.get("progress")) || 1
    const status = String(formData.get("status")) as Status
    const genre = String(formData.get("genre")) || null
    const totalEpisodes = formData.get("totalEpisodes") ? Number(formData.get("totalEpisodes")) : null

    if (!title) {
      return { error: "Judul harus diisi" }
    }

    if (!["ANIME", "MANGA"].includes(category)) {
      return { error: "Kategori tidak valid" }
    }

    if (!["ONGOING", "COMPLETED"].includes(status)) {
      return { error: "Status tidak valid" }
    }

    const entry = await prisma.entry.create({
      data: {
        title,
        category,
        progress,
        status,
        genre: genre || undefined,
        totalEpisodes,
        coverColor: generateCoverColor(),
        userId: user.id,
      },
    })

    revalidatePath("/")
    return { success: true, entry }
  } catch (error) {
    console.error("Error creating entry:", error)
    return { error: "Gagal menambahkan entry" }
  }
}

// Get all entries for current user
export async function getEntriesAction() {
  try {
    const user = await getCurrentUser()

    const entries = await prisma.entry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return { success: true, entries }
  } catch (error) {
    console.error("Error fetching entries:", error)
    return { error: "Gagal mengambil data entry" }
  }
}

// Update entry
export async function updateEntryAction(formData: FormData) {
  try {
    const user = await getCurrentUser()

    const id = String(formData.get("id"))
    const title = String(formData.get("title"))
    const category = String(formData.get("category")) as Category
    const progress = Number(formData.get("progress")) || 1
    const status = String(formData.get("status")) as Status
    const genre = String(formData.get("genre")) || null
    const totalEpisodes = formData.get("totalEpisodes") ? Number(formData.get("totalEpisodes")) : null

    if (!id) {
      return { error: "ID entry tidak valid" }
    }

    if (!title) {
      return { error: "Judul harus diisi" }
    }

    if (!["ANIME", "MANGA"].includes(category)) {
      return { error: "Kategori tidak valid" }
    }

    if (!["ONGOING", "COMPLETED"].includes(status)) {
      return { error: "Status tidak valid" }
    }

    // Check if entry belongs to current user
    const existingEntry = await prisma.entry.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingEntry) {
      return { error: "Entry tidak ditemukan" }
    }

    const entry = await prisma.entry.update({
      where: {
        id,
      },
      data: {
        title,
        category,
        progress,
        status,
        genre: genre || undefined,
        totalEpisodes,
      },
    })

    revalidatePath("/")
    return { success: true, entry }
  } catch (error) {
    console.error("Error updating entry:", error)
    return { error: "Gagal mengupdate entry" }
  }
}

// Delete entry
export async function deleteEntryAction(id: string) {
  try {
    const user = await getCurrentUser()

    if (!id) {
      return { error: "ID entry tidak valid" }
    }

    // Check if entry belongs to current user
    const existingEntry = await prisma.entry.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingEntry) {
      return { error: "Entry tidak ditemukan" }
    }

    await prisma.entry.delete({
      where: {
        id,
      },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting entry:", error)
    return { error: "Gagal menghapus entry" }
  }
}

// Update progress (for "Lanjut" button)
export async function updateProgressAction(id: string) {
  try {
    const user = await getCurrentUser()

    if (!id) {
      return { error: "ID entry tidak valid" }
    }

    // Check if entry belongs to current user
    const existingEntry = await prisma.entry.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingEntry) {
      return { error: "Entry tidak ditemukan" }
    }

    if (existingEntry.status === "COMPLETED") {
      return { error: "Entry sudah selesai" }
    }

    const newProgress = existingEntry.progress + 1
    let newStatus = existingEntry.status

    // Auto-complete if reached total episodes
    if (existingEntry.totalEpisodes && newProgress >= existingEntry.totalEpisodes) {
      newStatus = "COMPLETED"
    }

    const entry = await prisma.entry.update({
      where: {
        id,
      },
      data: {
        progress: newProgress,
        status: newStatus,
      },
    })

    revalidatePath("/")
    return { success: true, entry }
  } catch (error) {
    console.error("Error updating progress:", error)
    return { error: "Gagal mengupdate progress" }
  }
}

// Get entry statistics
export async function getEntryStatsAction() {
  try {
    const user = await getCurrentUser()

    const stats = await prisma.entry.groupBy({
      by: ["category", "status"],
      where: {
        userId: user.id,
      },
      _count: {
        id: true,
      },
    })

    const animeCount = stats.filter((stat) => stat.category === "ANIME").reduce((sum, stat) => sum + stat._count.id, 0)

    const mangaCount = stats.filter((stat) => stat.category === "MANGA").reduce((sum, stat) => sum + stat._count.id, 0)

    const ongoingCount = stats
      .filter((stat) => stat.status === "ONGOING")
      .reduce((sum, stat) => sum + stat._count.id, 0)

    const completedCount = stats
      .filter((stat) => stat.status === "COMPLETED")
      .reduce((sum, stat) => sum + stat._count.id, 0)

    return {
      success: true,
      stats: {
        anime: animeCount,
        manga: mangaCount,
        ongoing: ongoingCount,
        completed: completedCount,
        total: animeCount + mangaCount,
      },
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return { error: "Gagal mengambil statistik" }
  }
}

// Search entries
export async function searchEntriesAction(query: string) {
  try {
    const user = await getCurrentUser()

    if (!query.trim()) {
      return getEntriesAction()
    }

    const entries = await prisma.entry.findMany({
      where: {
        userId: user.id,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            genre: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return { success: true, entries }
  } catch (error) {
    console.error("Error searching entries:", error)
    return { error: "Gagal mencari entry" }
  }
}
