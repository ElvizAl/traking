"use client"

import { BookOpen, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardsProps {
  animeCount: number
  mangaCount: number
}

export function StatsCards({ animeCount, mangaCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <Card className="bg-gradient-to-br from-pink-500/10 to-violet-500/10 border-pink-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-pink-400" />
            <div>
              <p className="text-xs text-slate-400">Anime</p>
              <p className="text-lg font-bold text-white">{animeCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-xs text-slate-400">Manga</p>
              <p className="text-lg font-bold text-white">{mangaCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
