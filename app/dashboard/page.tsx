"use client";

import { motion } from "framer-motion";
import { TaskContainer } from "@/components/TaskContainer";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTaskForm from "@/components/addTask";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { useQuery } from "@tanstack/react-query";
import { getPings } from "@/app/actions/task";
import { DashboardSidebar, useSidebar } from "@/components/DashboardSidebar";
import { DashboardStatsSkeleton } from "@/components/skeletons/DashboardStatsSkeleton";
import { InfiniteGrid } from "@/components/ui/infinite-grid-integration";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative">
      {/* Animated Infinite Grid Background */}
      <InfiniteGrid />
      
      <DashboardSidebar />
      
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { isCollapsed } = useSidebar();
  const { data, isLoading } = useQuery({
    queryKey: ["pingTask"],
    queryFn: async () => getPings(),
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
  });

  const tasks = data && 'additional' in data && data.additional?.pings ? data.additional.pings : [];

  return (
    <div className={cn(
      "flex-1 flex flex-col min-h-screen w-full relative z-10 transition-all duration-300",
      isCollapsed ? "md:ml-[80px]" : "md:ml-[280px]"
    )}>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-8"
            >
              <DashoardHeader />
              {isLoading ? (
                <DashboardStatsSkeleton />
              ) : (
                tasks.length > 0 && <DashboardStats tasks={tasks} />
              )}
              <TaskContainer />
            </motion.div>
          </div>
        </main>
    </div>
  );
}

function DashoardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <motion.h1
            className="text-4xl font-bold tracking-tight md:text-5xl text-[#E8E6E3] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dashboard
          </motion.h1>
          <p className="text-sm text-[rgba(232,230,227,0.70)]">
            Monitor and manage your website pings
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-start sm:justify-end">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden flex justify-center items-center border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>

          <motion.div
            className="flex items-center gap-3"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.4}}
          >
              <Button
                variant="default"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-primary text-black hover:bg-primary/90 px-4 py-2 shadow-lg shadow-primary/20"
              >
                  <Plus className="h-4 w-4"/>
                  <span className="hidden lg:inline">Add Task</span>
              </Button>
          </motion.div>
        </div>   
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Task"
        description="Add a new task to monitor"
      >
        <AddTaskForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </motion.div>
  );
}
