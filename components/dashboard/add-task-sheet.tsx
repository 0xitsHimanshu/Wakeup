"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Bell } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface AddTaskSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (url: string, discordWebhook?: string) => Promise<void>
}

export function AddTaskSheet({ open, onOpenChange, onSubmit }: AddTaskSheetProps) {
  const [url, setUrl] = useState("")
  const [discordEnabled, setDiscordEnabled] = useState(false)
  const [discordWebhook, setDiscordWebhook] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ url?: string; webhook?: string }>({})

  const validateForm = () => {
    const newErrors: { url?: string; webhook?: string } = {}

    if (!url) {
      newErrors.url = "URL is required"
    } else if (!url.startsWith("https://")) {
      newErrors.url = "URL must start with https://"
    }

    if (discordEnabled && !discordWebhook) {
      newErrors.webhook = "Discord webhook URL is required when enabled"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(url, discordEnabled ? discordWebhook : undefined)
      setUrl("")
      setDiscordEnabled(false)
      setDiscordWebhook("")
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-background border-border">
        <SheetHeader>
          <SheetTitle className="font-sentient text-2xl">
            Add <i className="font-light">Task</i>
          </SheetTitle>
          <SheetDescription className="font-mono text-foreground/60 text-sm">
            Create a new monitoring task to track your endpoint.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-foreground/60 uppercase">URL to Monitor</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/health"
              className={cn(
                "w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors",
                errors.url && "border-red-500",
              )}
              style={{
                clipPath:
                  "polygon(8px 0, calc(100% - 8px) 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 calc(100% - 8px), 0 8px)",
              }}
            />
            {errors.url && <p className="font-mono text-xs text-red-500">{errors.url}</p>}
          </div>

          {/* Discord Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-foreground/60" />
                <span className="font-mono text-sm text-foreground">Discord Notifications</span>
              </div>
              <Switch checked={discordEnabled} onCheckedChange={setDiscordEnabled} />
            </div>

            {/* Conditional Discord Webhook Input */}
            {discordEnabled && (
              <div className="space-y-2">
                <label className="font-mono text-xs text-foreground/60 uppercase">Discord Webhook URL</label>
                <input
                  type="text"
                  value={discordWebhook}
                  onChange={(e) => setDiscordWebhook(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/..."
                  className={cn(
                    "w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors",
                    errors.webhook && "border-red-500",
                  )}
                  style={{
                    clipPath:
                      "polygon(8px 0, calc(100% - 8px) 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 calc(100% - 8px), 0 8px)",
                  }}
                />
                {errors.webhook && <p className="font-mono text-xs text-red-500">{errors.webhook}</p>}
              </div>
            )}
          </div>

          {/* Default Alert Message */}
          <div
            className="bg-primary/10 border border-primary/30 p-4"
            style={{
              clipPath:
                "polygon(8px 0, calc(100% - 8px) 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 calc(100% - 8px), 0 8px)",
            }}
          >
            <p className="font-mono text-xs text-primary">
              Notifications will be sent when your endpoint goes down or recovers.
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              "[Create Task]"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
