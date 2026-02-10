import { PingTask } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getPings } from "@/app/actions/task";
import { TaskCard } from "./Cards/Task";
import { Card, CardContent } from "./ui/card";
import { ArrowUpCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { TaskCardSkeleton } from "./skeletons/TaskCardSkeleton";

export function TaskContainer() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pingTask"],
    queryFn: async () => getPings(),
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
  });

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to fetch tasks. Please try again.";
      
      toast.error("Error fetching tasks", {
        description: errorMessage,
      });
    } else if (data && 'status' in data && (data as { status: boolean }).status === false) {
      // Handle error response from server action
      const errorData = data as { message: string; name?: string };
      toast.error(errorData.name || "Error fetching tasks", {
        description: errorData.message || "Failed to fetch tasks. Please try again.",
      });
    }
  }, [error, data]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <div className="h-8 w-48 bg-[rgba(255,255,255,0.05)] rounded-lg mb-2 animate-pulse" />
          <div className="h-4 w-64 bg-[rgba(255,255,255,0.05)] rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <TaskCardSkeleton key={`task-skeleton-${index}`} />
            ))}
        </div>
      </div>
    );
  }

  // Check for error response in data (from server action error handler)
  if (data && 'status' in data && (data as { status: boolean }).status === false) {
    const errorData = data as { message: string; name?: string };
    return (
      <Card className="w-full border border-gray-800 bg-gray-950 shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="w-16 h-16 mb-4 text-red-400" />
          <h3 className="text-xl font-semibold mb-2 text-[#E8E6E3]">{errorData.name || "Failed to fetch tasks"}</h3>
          <p className="text-sm text-[rgba(232,230,227,0.70)]">
            {errorData.message || "An error occurred while fetching tasks. Please try again."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border border-gray-800 bg-gray-950 shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="w-16 h-16 mb-4 text-red-400" />
          <h3 className="text-xl font-semibold mb-2 text-[#E8E6E3]">Failed to fetch tasks</h3>
          <p className="text-sm text-[rgba(232,230,227,0.70)]">
            {error instanceof Error ? error.message : "An error occurred while fetching tasks. Please try again."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if(!data?.additional?.pings || data.additional.pings.length === 0) {
    return(
        <Card className="w-full border border-gray-800 bg-gray-950 shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <ArrowUpCircle className="w-16 h-16 mb-4 text-[rgba(232,230,227,0.50)]"/>
                <h3 className="text-xl font-semibold mb-2 text-[#E8E6E3]">No tasks yet</h3>
                <p className="text-sm text-[rgba(232,230,227,0.70)]">Use the button above to add your first task.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#E8E6E3] mb-2">Your Tasks</h2>
        <p className="text-sm text-[rgba(232,230,227,0.70)]">
          Monitor and manage all your website pings
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.additional.pings.map((task: PingTask) => {
          return <TaskCard key={task.ID} Task={task} />;
        })}
      </div>
    </div>
  );
}
