"use client"

import { LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  onAddTask: () => void
}

export function DashboardHeader({ onAddTask }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-foreground/50 mt-1">Monitor your endpoints</p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={onAddTask} className="gap-2 rounded-lg">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>

        <Link href="/getstarted">
          <Button size="sm" variant="outline" className="gap-2 rounded-lg">
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
