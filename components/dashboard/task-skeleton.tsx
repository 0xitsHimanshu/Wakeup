export function TaskSkeleton() {
  return (
    <div
      className="border border-border bg-background/50 backdrop-blur-sm p-4 sm:p-5 animate-pulse"
      style={{
        clipPath:
          "polygon(12px 0, calc(100% - 12px) 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 calc(100% - 12px), 0 12px)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-foreground/20" />
          <div className="h-4 w-48 bg-foreground/20 rounded" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-3 w-24 bg-foreground/20 rounded hidden sm:block" />
          <div className="size-4 bg-foreground/20 rounded" />
        </div>
      </div>
    </div>
  )
}
