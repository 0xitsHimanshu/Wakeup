import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-8">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className="border border-[rgba(255,255,255,0.08)] bg-[rgba(54,56,56,0.53)] shadow-none gap-0"
          >
            <CardContent className="p-3 sm:p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-3 sm:h-4 w-12 sm:w-20 bg-[rgba(255,255,255,0.1)] mb-1" />
                  <Skeleton className="h-5 sm:h-6 md:h-8 w-8 sm:w-10 md:w-12 bg-[rgba(255,255,255,0.1)]" />
                </div>
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg bg-[rgba(255,255,255,0.1)] flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

