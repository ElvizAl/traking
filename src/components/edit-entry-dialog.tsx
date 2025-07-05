"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Entry {
  id: string
  title: string
  category: "anime" | "manga"
  progress: number
  status: "ongoing" | "completed"
  genre?: string
  totalEpisodes?: number
  coverColor: string
}

interface EditEntryDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (entry: Entry) => void
  entry: Entry | null
}

const genreOptions = [
  "Aksi",
  "Petualangan",
  "Komedi",
  "Drama",
  "Fantasi",
  "Horor",
  "Misteri",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Olahraga",
  "Supernatural",
]

export function EditEntryDialog({ isOpen, onClose, onUpdate, entry }: EditEntryDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "anime" as "anime" | "manga",
    progress: 1,
    status: "ongoing" as "ongoing" | "completed",
    genre: "",
    totalEpisodes: "",
  })

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        category: entry.category,
        progress: entry.progress,
        status: entry.status,
        genre: entry.genre || "",
        totalEpisodes: entry.totalEpisodes?.toString() || "",
      })
    }
  }, [entry])

  const handleUpdate = () => {
    if (!entry || !formData.title) return

    const updatedEntry: Entry = {
      ...entry,
      title: formData.title,
      category: formData.category,
      progress: formData.progress,
      status: formData.status,
      genre: formData.genre || undefined,
      totalEpisodes: formData.totalEpisodes ? Number.parseInt(formData.totalEpisodes) : undefined,
    }

    onUpdate(updatedEntry)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="text-center bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Edit Entry ✏️
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-title" className="text-slate-300">
              Judul
            </Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Masukkan judul..."
            />
          </div>

          <div>
            <Label htmlFor="edit-category" className="text-slate-300">
              Kategori
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value: "anime" | "manga") => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="anime">🎬 Anime</SelectItem>
                <SelectItem value="manga">📘 Manga</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="edit-progress" className="text-slate-300">
                {formData.category === "anime" ? "Episode" : "Chapter"}
              </Label>
              <Input
                id="edit-progress"
                type="number"
                min="1"
                value={formData.progress}
                onChange={(e) => setFormData((prev) => ({ ...prev, progress: Number.parseInt(e.target.value) || 1 }))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="edit-status" className="text-slate-300">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: "ongoing" | "completed") => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="ongoing">📺 Sedang Berjalan</SelectItem>
                  <SelectItem value="completed">✅ Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-genre" className="text-slate-300">
              Genre (Opsional)
            </Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Pilih genre..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {genreOptions.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleUpdate}
            disabled={!formData.title}
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
          >
            Update Entry ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
