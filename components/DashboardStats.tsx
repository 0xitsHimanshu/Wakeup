"use client";

import { PingTask } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStatsProps {
  tasks: PingTask[];
}

export function DashboardStats({ tasks }: DashboardStatsProps) {
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((task) => task.isActive).length;
  const inactiveTasks = totalTasks - activeTasks;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: Activity,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Active",
      value: activeTasks,
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-500/30",
    },
    {
      label: "Inactive",
      value: inactiveTasks,
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`border ${stat.borderColor} bg-gray-950 shadow-none hover:shadow-lg transition-shadow gap-0 !py-0`}>
              <CardContent className="p-3 sm:p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-[rgba(232,230,227,0.70)] mb-1 truncate">
                      {stat.label}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E8E6E3] leading-tight">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}


