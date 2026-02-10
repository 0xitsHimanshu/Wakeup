"use client";

import { PingTask } from "@/types";
import { Modal } from "@/components/ui/modal";
import { GetLastPingTime, cn, convertTo24HourFormat } from "@/lib/utils";
import Link from "next/link";
import { Clock } from "lucide-react";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: PingTask | null;
}

export function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
  if (!task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Task Details"
      description={new URL(task.url).hostname + new URL(task.url).pathname}
      className="max-w-3xl max-h-[calc(100vh-2rem)]"
    >
      <div className="flex flex-col h-full min-h-0">
        {/* Task Info */}
        <div className="space-y-4 flex-shrink-0 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  task.isActive 
                    ? "bg-green-500 shadow-lg shadow-green-500/50" 
                    : "bg-red-500 shadow-lg shadow-red-500/50"
                }`}
              />
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                task.isActive 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {task.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#E8E6E3] mb-2">URL</h3>
            <Link
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {task.url}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-[rgba(232,230,227,0.70)]">
            <Clock className="h-4 w-4" />
            <span>Last ping: {GetLastPingTime(task)}</span>
          </div>
        </div>

        {/* Logs Section */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 flex flex-col flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent"></div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[rgba(232,230,227,0.70)]">Activity Logs</h4>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent"></div>
          </div>

          {task.logs.length === 0 ? (
            <div className="w-full text-center py-8 flex-shrink-0">
              <p className="text-sm text-[rgba(232,230,227,0.50)]">No logs available</p>
            </div>
          ) : (
            <div className="w-full space-y-2 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-lg p-4 backdrop-blur-sm overflow-y-auto flex-1 min-h-0">
              {task.logs.slice(-20).reverse().map((log, index) => {
                // Determine color based on status code
                let logColor = "text-green-400"; // Default: success
                let bgColor = "bg-green-500/10";
                if (log.respCode >= 500) {
                  logColor = "text-red-400"; // Server errors
                  bgColor = "bg-red-500/10";
                } else if (log.respCode >= 400) {
                  logColor = "text-yellow-400"; // Client errors (warnings)
                  bgColor = "bg-yellow-500/10";
                } else if (log.respCode >= 300) {
                  logColor = "text-yellow-400"; // Redirects (warnings)
                  bgColor = "bg-yellow-500/10";
                } else if (!log.isSuccess) {
                  logColor = "text-red-400"; // Failed pings
                  bgColor = "bg-red-500/10";
                }
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "text-sm font-mono px-3 py-2 rounded-md border border-[rgba(255,255,255,0.05)]",
                      logColor,
                      bgColor
                    )}
                  >
                    <span className="font-medium text-[rgba(232,230,227,0.70)] mr-2">
                      [{convertTo24HourFormat(log.time)}]
                    </span>
                    <span className="font-semibold">{log.respCode}</span>
                    <span className="ml-2">{log.logResponse}</span>
                    {log.timeTaken && (
                      <span className="ml-2 text-[rgba(232,230,227,0.50)]">
                        ({log.timeTaken}ms)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

