"use client"

import { ChevronRight, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

interface EntryCardProps {
  entry: Entry
  onEdit: (entry: Entry) => void
  onDelete: (id: string) => void
  onNext: (id: string) => void
}

export function EntryCard({ entry, onEdit, onDelete, onNext }: EntryCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${entry.coverColor}`} />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{entry.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                {entry.category === "anime" ? "🎬" : "📘"} {entry.category}
              </Badge>
              {entry.genre && (
                <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                  {entry.genre}
                </Badge>
              )}
            </div>
          </div>

          <Badge
            variant={entry.status === "completed" ? "default" : "secondary"}
            className={
              entry.status === "completed"
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            }
          >
            {entry.status === "completed" ? "✅ Selesai" : "📺 Berjalan"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-slate-300">
            <span className="text-xs text-slate-400">{entry.category === "anime" ? "Episode" : "Chapter"}:</span>
            <span className="ml-1 font-semibold text-white">
              {entry.progress}
              {entry.totalEpisodes && `/${entry.totalEpisodes}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Action Buttons */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Edit2 className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                <DropdownMenuItem onClick={() => onEdit(entry)} className="text-slate-300">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Entry?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        Kamu yakin mau hapus "{entry.title}"? Aksi ini tidak bisa dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(entry.id)} className="bg-red-600 hover:bg-red-700">
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Next Button */}
            {entry.status === "ongoing" && (
              <Button
                size="sm"
                onClick={() => onNext(entry.id)}
                className="bg-gradient-to-r from-pink-500/20 to-violet-500/20 hover:from-pink-500/30 hover:to-violet-500/30 border border-pink-500/30 text-pink-300"
              >
                <span className="text-xs">Lanjut</span>
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
