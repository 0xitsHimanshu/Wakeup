"use client";

import { useState } from "react";
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Menu,
  Eye,
  Trash2Icon,
  EyeOffIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { PingTask } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  GetLastPingTime,
  cn,
  convertTo24HourFormat,
  formatTime,
} from "@/lib/utils";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoopIcon } from "@radix-ui/react-icons";
import { deleteTask, reactivateTask } from "@/app/actions/task";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { url } from "inspector";

export function TaskCard({ Task }: { Task: PingTask }) {
  const [selectedTask, setSelectedTask] = useState<PingTask | null>(null);
  const [isReactivating, setIsReactivating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const toggleTaskDetails = (task: PingTask) => {
    setSelectedTask(selectedTask && selectedTask.ID === task.ID ? null : task);
  };
  const queryClient = useQueryClient();

  const handleDeleteTask = async (Task: PingTask) => {
    try {
      setIsDeleting(true);
      const response = await deleteTask({ taskId: Task.ID });

      if (response) {
        toast.success("Task deleted successfully", {
          description: "Task will no longer ping",
        });
        await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      }
    } catch (err) {
      toast.error("Failed to delete task", {
        description: "Please try again later",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleReactivateTask = async (Task: PingTask) => {
    try {
      setIsReactivating(true);
      const response = await reactivateTask({ taskId: Task.ID });

      if (response) {
        toast.success("Task reactivated successfully", {
          description: "Task will now start pinging",
        });
        await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      }
    } catch (err) {
      toast.error("Failed to reactivate task", {
        description: "Please try again later",
      });
    } finally {
      setIsReactivating(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="space-y-4">
        <Card key={Task.ID} className="border border-[rgba(255,255,255,0.08)] bg-[rgba(54,56,56,0.53)] shadow-none">
          <CardContent className="p-6">
            <TaskHeader
              Task={Task}
              selectedTask={selectedTask}
              ReactivateTask={handleReactivateTask}
              isReactivating={isReactivating}
              toggleTaskDetails={toggleTaskDetails}
              DeleteTask={handleDeleteTask}
              isDeleting={isDeleting}
            />
            <TaskLogs Task={Task} selectedTask={selectedTask} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const TaskHeader = ({
  Task,
  selectedTask,
  ReactivateTask,
  isReactivating,
  toggleTaskDetails,
  DeleteTask,
  isDeleting,
}: {
  Task: PingTask;
  selectedTask: PingTask | null;
  ReactivateTask: (task: PingTask) => void;
  isReactivating: boolean;
  toggleTaskDetails: (task: PingTask) => void;
  DeleteTask: (task: PingTask) => void;
  isDeleting: boolean;
}) => {
  return (
    <div
      className="flex justify-between items-center relative cursor-pointer group"
      onClick={() => toggleTaskDetails(Task)}
    >
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-[#88a7bf] text-left">
          <Link href={Task.url} className="hidden md:inline-block hover:text-[#88a7bf]/50 transition-colors">
            {new URL(Task.url).hostname + new URL(Task.url).pathname}
          </Link>
          <Link href={Task.url} className="md:hidden hover:text-primary transition-colors">
            {new URL(Task.url).hostname.length > 20
              ? new URL(Task.url).hostname.substring(0, 20) + "..."
              : new URL(Task.url).hostname}
          </Link>
        </h3>
        <p className="text-sm text-[rgba(232,230,227,0.70)] mt-1">
          Last ping: {GetLastPingTime(Task)}
        </p>
      </div>
      <div className="hidden md:flex space-x-2 items-center">
        <div
          className={`h-3 w-3 rounded-full mr-3 ${
            Task.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>

        {!Task.isActive && (
          <Button
            variant="default"
            className="bg-primary text-black hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation();
              ReactivateTask(Task);
            }}
          >
            {isReactivating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LoopIcon className="h-4 w-4" />
                Reactivate
              </>
            )}
          </Button>
        )}

        <Button 
          variant="outline" 
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskDetails(Task);
          }}
          className="border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)]"
        >
          {selectedTask && selectedTask.ID === Task.ID ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
        <Button
          variant="outline"
          className="border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-[#E8E6E3]"
          onClick={(e) => {
            e.stopPropagation();
            DeleteTask(Task);
          }}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex justify-center items-center md:hidden ">
        <div
          className={`h-3 w-3 rounded-full mr-3 ${
            Task.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        {!Task.isActive && (
          <Button
            variant="default"
            className="bg-primary text-black hover:bg-primary/90 mr-2 md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              ReactivateTask(Task);
            }}
          >
            {isReactivating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LoopIcon className="h-4 w-4" />
            )}
          </Button>
        )}
        <Button
          variant="outline"
          className="border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-[#E8E6E3] md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            DeleteTask(Task);
          }}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

const TaskLogs = ({
  Task,
  selectedTask,
}: {
  Task: PingTask;
  selectedTask: PingTask | null;
}) => {
  return (
    <AnimatePresence>
      {selectedTask && selectedTask.ID === Task.ID && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mt-4"
        >
          <div className="flex flex-col items-start justify-start">
            <h4 className="font-semibold mb-3 text-[#E8E6E3]">Logs</h4>
            {Task.logs.length === 0 ? (
              <p className="text-sm text-[rgba(232,230,227,0.50)]">No logs available</p>
            ) : (
              <ul className="space-y-2 bg-[rgb(0,0,0)] border border-[rgba(255,255,255,0.08)] w-full flex flex-col justify-center items-start gap-0 px-4 py-3 rounded-lg">
                {Task.logs.map((log, index) => {
                  // Determine color based on status code
                  let logColor = "text-green-500"; // Default: success
                  if (log.respCode >= 500) {
                    logColor = "text-red-500"; // Server errors
                  } else if (log.respCode >= 400) {
                    logColor = "text-yellow-500"; // Client errors (warnings)
                  } else if (log.respCode >= 300) {
                    logColor = "text-yellow-500"; // Redirects (warnings)
                  } else if (!log.isSuccess) {
                    logColor = "text-red-500"; // Failed pings
                  }
                  
                  return (
                    <li
                      key={index}
                      className={cn(
                        "text-sm text-left font-mono",
                        logColor
                      )}
                    >
                      <span className="font-medium text-[rgba(232,230,227,0.70)]">
                        [ {convertTo24HourFormat(log.time)} ]
                      </span>{" "}
                      - {log.logResponse}{log.respCode}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileMenu = ({
  Task,
  selectedTask,
  ReactivateTask,
  toggleTaskDetails,
  DeleteTask,
}: {
  Task: PingTask;
  selectedTask: PingTask | null;
  ReactivateTask: (task: PingTask) => void;
  toggleTaskDetails: (task: PingTask) => void;
  DeleteTask: (task: PingTask) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => ReactivateTask(Task)}>
          {!Task.isActive && (
            <>
              <LoopIcon className="mr-2 h-4 w-4" />
              Reactivate
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toggleTaskDetails(Task)}>
          {selectedTask && selectedTask.ID === Task.ID ? (
            <>
              <EyeOffIcon className="mr-2 h-4 w-4" />
              Close Logs
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              View Logs
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => DeleteTask(Task)}>
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};