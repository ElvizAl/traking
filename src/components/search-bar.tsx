import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function SearchBar() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Cari judul..."
          className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
        />
      </div>

      <Button
        className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
