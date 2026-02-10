"use client";

import { useState } from "react";
import {
  Trash2,
  Loader2,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { PingTask } from "@/types";
import { motion } from "framer-motion";
import {
  GetLastPingTime,
} from "@/lib/utils";
import Link from "next/link";

import { LoopIcon } from "@radix-ui/react-icons";
import { deleteTask, reactivateTask } from "@/app/actions/task";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { TaskDetailsModal } from "@/components/TaskDetailsModal";

export function TaskCard({ Task }: { Task: PingTask }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReactivating, setIsReactivating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
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
    } catch {
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
    } catch {
      toast.error("Failed to reactivate task", {
        description: "Please try again later",
      });
    } finally {
      setIsReactivating(false);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card key={Task.ID} className="border border-gray-800 bg-gray-950 shadow-lg hover:shadow-xl hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <TaskHeader
              Task={Task}
              ReactivateTask={handleReactivateTask}
              isReactivating={isReactivating}
              onViewLogs={() => setIsModalOpen(true)}
              DeleteTask={handleDeleteTask}
              isDeleting={isDeleting}
            />
          </CardContent>
        </Card>
      </motion.div>
      
      <TaskDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={Task}
      />
    </>
  );
}

const TaskHeader = ({
  Task,
  ReactivateTask,
  isReactivating,
  onViewLogs,
  DeleteTask,
  isDeleting,
}: {
  Task: PingTask;
  ReactivateTask: (task: PingTask) => void;
  isReactivating: boolean;
  onViewLogs: () => void;
  DeleteTask: (task: PingTask) => void;
  isDeleting: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`h-3 w-3 rounded-full flex-shrink-0 ${
                Task.isActive 
                  ? "bg-green-500 shadow-lg shadow-green-500/50" 
                  : "bg-red-500 shadow-lg shadow-red-500/50"
              }`}
            />
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              Task.isActive 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            }`}>
              {Task.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#E8E6E3] mb-2 group">
            <Link 
              href={Task.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors break-words"
            >
              {new URL(Task.url).hostname + new URL(Task.url).pathname}
            </Link>
          </h3>
          <div className="flex items-center gap-2 text-sm text-[rgba(232,230,227,0.70)]">
            <Clock className="h-4 w-4" />
            <span>Last ping: {GetLastPingTime(Task)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          {!Task.isActive && (
            <Button
              variant="default"
              size="sm"
              className="bg-primary text-black hover:bg-primary/90 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                ReactivateTask(Task);
              }}
            >
              {isReactivating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LoopIcon className="h-4 w-4 mr-2" />
                  Reactivate
                </>
              )}
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewLogs();
            }}
            className="border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Logs
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(255,255,255,0.08)] hover:bg-red-500/10 hover:border-red-500/30 text-[#E8E6E3] rounded-lg"
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
    </div>
  );
};

