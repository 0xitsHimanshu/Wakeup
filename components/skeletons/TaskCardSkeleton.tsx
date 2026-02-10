import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskCardSkeleton() {
  return (
    <Card className="border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[rgba(54,56,56,0.53)] to-[rgba(30,30,30,0.53)] shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Status badge and URL */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.1)]" />
              <Skeleton className="h-5 w-16 rounded-full bg-[rgba(255,255,255,0.1)]" />
            </div>
          </div>

          {/* URL */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-3/4 bg-[rgba(255,255,255,0.1)]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded bg-[rgba(255,255,255,0.1)]" />
              <Skeleton className="h-4 w-24 bg-[rgba(255,255,255,0.1)]" />
            </div>
          </div>

          {/* Divider */}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-24 bg-[rgba(255,255,255,0.1)]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-28 bg-[rgba(255,255,255,0.1)]" />
                <Skeleton className="h-9 w-9 bg-[rgba(255,255,255,0.1)]" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

