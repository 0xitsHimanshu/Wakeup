"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Trash2, RotateCcw, Loader2 } from "lucide-react"
import type { Task } from "@/app/dashboard/page"
import { toast } from "sonner"

interface TaskCardProps {
  task: Task
  onDelete: (taskId: string) => Promise<void>
  onReactivate: (taskId: string) => Promise<void>
}

function formatUrl(url: string) {
  try {
    const parsed = new URL(url)
    return `${parsed.hostname}${parsed.pathname}`
  } catch {
    return url
  }
}

function formatTimeAgo(date: Date | null) {
  if (!date) return "Never"
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function TaskCard({ task, onDelete, onReactivate }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isReactivating, setIsReactivating] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleting(true)
    try {
      await onDelete(task.id)
      toast.success("Task deleted successfully")
    } catch {
      toast.error("Failed to delete task")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleReactivate = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsReactivating(true)
    try {
      await onReactivate(task.id)
      toast.success("Task reactivated successfully")
    } catch {
      toast.error("Failed to reactivate task")
    } finally {
      setIsReactivating(false)
    }
  }

  return (
    <div
      className="border border-border/50 rounded-xl bg-background/30 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-border hover:bg-background/50 overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Health Status Indicator */}
          <span
            className={`size-2 rounded-full shrink-0 transition-colors ${
              task.active
                ? "bg-emerald-500"
                : "bg-red-500"
            }`}
          />

          {/* URL */}
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-mono text-sm text-foreground truncate">{formatUrl(task.url)}</span>
            <span className="text-xs text-foreground/40 sm:hidden">
              {formatTimeAgo(task.lastPing)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Last Ping */}
          <span className="text-xs text-foreground/40 hidden sm:block">
            {formatTimeAgo(task.lastPing)}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {!task.active && (
              <button
                onClick={handleReactivate}
                disabled={isReactivating}
                className="p-1.5 text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all disabled:opacity-50"
              >
                {isReactivating ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
              </button>
            )}

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 text-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            </button>

            <ChevronDown
              className="size-4 text-foreground/40 transition-transform duration-200"
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Expandable Logs Section */}
      <div
        style={{
          maxHeight: isExpanded ? "400px" : "0px",
          overflow: "hidden",
          transition: "all 200ms ease-in-out",
        }}
      >
        <div className="border-t border-border/30 px-5 py-4 bg-background/20">
          <h4 className="text-xs font-medium text-foreground/50 mb-3">Recent Activity</h4>

          {task.logs.length === 0 ? (
            <p className="text-sm text-foreground/30">No logs available</p>
          ) : (
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
              {task.logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-center gap-3 text-xs p-2.5 rounded-lg transition-colors ${
                    log.success ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "bg-red-500/5 hover:bg-red-500/10"
                  }`}
                >
                  <span className="text-foreground/30 shrink-0 font-mono">{log.timestamp.toLocaleTimeString()}</span>
                  <span className={`flex-1 font-mono ${
                    log.success ? "text-emerald-400/90" : "text-red-400/90"
                  }`}>{log.message}</span>
                  <span className={`shrink-0 font-mono font-medium ${
                    log.success ? "text-emerald-500/70" : "text-red-500/70"
                  }`}>{log.statusCode}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
