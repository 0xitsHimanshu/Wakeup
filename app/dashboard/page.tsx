"use client";

import { motion } from "framer-motion";
import { TaskContainer } from "@/components/TaskContainer";
import { LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/SectionWrapper";
import AddTaskForm from "@/components/addTask";
import SheetWrapper from "@/components/sheetWrapper";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <SectionWrapper>
      <div className="grow flex flex-col min-h-screen bg-black text-white w-full">
        <div>
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-8"
            >
              <DashoardHeader />
              <TaskContainer />
            </motion.div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}

function DashoardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-[85%] md:px-4 py-6 md:py-8 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex sm:flex-row sm:items-center justify-between gap-4">
          <motion.h1
            className="text-3xl font-semibold tracking-tight md:text-4xl text-center sm:text-left text-[#E8E6E3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dashboard
          </motion.h1>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-0 bg-transparent hover:bg-transparent text-sm text-[#E8E6E3]/70 hover:text-[#E8E6E3] normal-case rounded-none px-2 py-1 h-auto font-normal"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden flex justify-center items-center border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)]"
              onClick={() => setIsOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>

            <motion.div
              className="hidden md:flex md:items-center md:gap-3"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.4}}
            >
                <Button
                  variant="default"
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-primary text-black hover:bg-primary/90 px-3 py-2"
                >
                    <Plus className="h-4 w-4"/>
                    <span className="hidden lg:inline">Add Task</span>
                </Button>
            </motion.div>
          </div>   
        </div>
      </div>

      <SheetWrapper
        title="Add Task"
        description="Add a new task to monitor"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <AddTaskForm />
      </SheetWrapper>
    </motion.div>
  );
}
