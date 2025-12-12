import { PingTask } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getPings } from "@/app/actions/task";
import { Skeleton } from "./ui/skeleton";
import { TaskCard } from "./TaskCard";
import { Card, CardContent } from "./ui/card";
import { ArrowUpCircle } from "lucide-react";

export function TaskContainer() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pingsTask"],
    queryFn: async () => getPings(),
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 w-full md:w-[80%]">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              className="h-12 bg-muted-foreground rounded-xl"
              key={index}
            />
          ))}
      </div>
    );
  }

  if(!data?.additional?.pings || data.additonal.pings.length === 0) {
    return(
        <Card className="w-full md:w-[80%] mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <ArrowUpCircle className="w-12 h-12 mb-4 text-muted-foreground"/>
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-sm text-muted-foreground">Use the button above to add your first task.</p>
            </CardContent>
        </Card>
    )
  }

  if(error){
    return <p>Failed to fetch tasks.</p>
  }

  return (
    <div className="w-full md:w-[80%] flex justify-center item-start flex-col gap-3">
      {data.additional.pings.map((task: PingTask) => {
        return <TaskCard key={task.ID} Task={task} />;
      })}
    </div>
  );
}
