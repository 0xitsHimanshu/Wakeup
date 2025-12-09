"use client"

import { Plus } from "lucide-react"
import type { Task } from "@/app/dashboard/page"
import { TaskCard } from "./task-card"
import { TaskSkeleton } from "./task-skeleton"

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  onDelete: (taskId: string) => Promise<void>
  onReactivate: (taskId: string) => Promise<void>
}

export function TaskList({ tasks, isLoading, onDelete, onReactivate }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="size-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
          <Plus className="size-8 text-foreground/20" />
        </div>
        <p className="text-sm text-foreground/40 max-w-sm">
          No monitoring tasks yet. Add your first endpoint to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-[calc(100svh-200px)] overflow-y-auto pr-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onReactivate={onReactivate} />
      ))}
    </div>
  )
}
