'use client'

import { motion} from "framer-motion"
import { TaskContainer } from "@components/TaskContainer"
import { LogOut, Menu, Plus } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/SectionWrapper"
import AddTaskForm from "@/components/forms/addTask"
import sheetWrapper from "@/components/wrappers/sheetWrapper"

