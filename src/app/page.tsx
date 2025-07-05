"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginDialog } from "@/components/login-dialog"
import { RegisterDialog } from "@/components/register-dialog"
import { UserProfile } from "@/components/user-profile"
import { StatsCards } from "@/components/stats-card"
import { SearchBar } from "@/components/search-bar"
import { EntryCard } from "@/components/entry-card"
import { AddEntryDialog } from "@/components/add-entry-dialog"
import { EditEntryDialog } from "@/components/edit-entry-dialog"

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

const colorOptions = [
  "from-pink-500 to-violet-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-blue-500",
]

export default function AnimeTracker() {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: "1",
      title: "Attack on Titan",
      category: "anime",
      progress: 75,
      status: "ongoing",
      genre: "Aksi",
      totalEpisodes: 87,
      coverColor: "from-red-500 to-orange-500",
    },
    {
      id: "2",
      title: "One Piece",
      category: "manga",
      progress: 1095,
      status: "ongoing",
      genre: "Petualangan",
      coverColor: "from-blue-500 to-cyan-500",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)

  const filteredEntries = useMemo(() => {
    let filtered = entries.filter((entry) => entry.title.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab !== "all") {
      filtered = filtered.filter((entry) => entry.category === activeTab)
    }

    return filtered
  }, [entries, searchQuery, activeTab])

  const stats = useMemo(() => {
    const animeCount = entries.filter((e) => e.category === "anime").length
    const mangaCount = entries.filter((e) => e.category === "manga").length
    return { animeCount, mangaCount }
  }, [entries])

  const handleLogin = (username: string) => {
    setIsLoggedIn(true)
    setUsername(username)
  }

  const handleRegister = (username: string) => {
    setIsLoggedIn(true)
    setUsername(username)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
  }

  const handleAddEntry = (entryData: Omit<Entry, "id" | "coverColor">) => {
    const newEntry: Entry = {
      ...entryData,
      id: Date.now().toString(),
      coverColor: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    }
    setEntries((prev) => [...prev, newEntry])
  }

  const handleEditEntry = (entry: Entry) => {
    setEditingEntry(entry)
    setIsEditDialogOpen(true)
  }

  const handleUpdateEntry = (updatedEntry: Entry) => {
    setEntries((prev) => prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry)))
    setEditingEntry(null)
  }

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const handleNextEpisode = (id: string) => {
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, progress: entry.progress + 1 } : entry)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">
            KomikTracker ✨
          </h1>
          <p className="text-slate-400 text-sm">Catat progress anime & manga kamu</p>
        </div>

        {/* Login/Register or User Profile */}
        {!isLoggedIn ? (
          <div className="flex gap-2 justify-center mb-6">
            <LoginDialog onLogin={handleLogin} />
            <RegisterDialog onRegister={handleRegister} />
          </div>
        ) : (
          <UserProfile username={username} onLogout={handleLogout} />
        )}

        {/* Stats Cards */}
        <StatsCards animeCount={stats.animeCount} mangaCount={stats.mangaCount} />

        {/* Search & Add Button */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsAddDialogOpen(true)}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500"
            >
              🧾 Semua
            </TabsTrigger>
            <TabsTrigger
              value="manga"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500"
            >
              📘 Manga
            </TabsTrigger>
            <TabsTrigger
              value="anime"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500"
            >
              🎬 Anime
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-slate-400">Belum ada entry</p>
                <p className="text-xs text-slate-500 mt-1">Tambah anime atau manga pertama kamu!</p>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
                onNext={handleNextEpisode}
              />
            ))
          )}
        </div>

        {/* Dialogs */}
        <AddEntryDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={handleAddEntry} />

        <EditEntryDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onUpdate={handleUpdateEntry}
          entry={editingEntry}
        />
      </div>
    </div>
  )
}
