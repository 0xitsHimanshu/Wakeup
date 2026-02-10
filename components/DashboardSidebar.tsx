"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createContext, useContext, useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Github,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Github",
    path: "https://github.com/0xitsHimanshu/Wakeup",
    icon: Github,
    external: true,
  },
];

// Context for sidebar state
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      router.push("/");
      setTimeout(() => {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)]"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-gradient-to-b from-[rgba(30,30,30,0.95)] to-[rgba(20,20,20,0.95)] border-r border-[rgba(255,255,255,0.08)] z-40",
          "backdrop-blur-xl",
          "md:fixed md:translate-x-0 md:z-auto md:flex-shrink-0",
          "transition-all duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:translate-x-0",
          isCollapsed && !isMobileOpen ? "md:w-[80px]" : "md:w-[280px]"
        )}
      >
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Logo/Header */}
          <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex-shrink-0 relative">
            <div className={cn(
              "transition-opacity duration-300",
              isCollapsed && "opacity-0 absolute"
            )}>
              <h2 className="text-xl font-bold text-[#E8E6E3]">Wakeup</h2>
              <p className="text-xs text-[rgba(232,230,227,0.70)] mt-1">
                Monitoring Dashboard
              </p>
            </div>
            {isCollapsed && (
              <div className="flex items-center justify-center">
                <h2 className="text-xl font-bold text-[#E8E6E3]">W</h2>
              </div>
            )}
            {/* Collapse Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className={cn(
                "absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full",
                "bg-gradient-to-b from-[rgba(30,30,30,0.95)] to-[rgba(20,20,20,0.95)]",
                "border border-[rgba(255,255,255,0.08)]",
                "hover:bg-[rgba(255,255,255,0.05)]",
                "hidden md:flex items-center justify-center",
                "shadow-lg z-50"
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-[#E8E6E3]" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-[#E8E6E3]" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <TooltipProvider delayDuration={300}>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.path || 
                  (item.path === "/dashboard" && pathname?.startsWith("/dashboard"));
                
                const navContent = (
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      "text-[rgba(232,230,227,0.70)] hover:text-[#E8E6E3] hover:bg-[rgba(255,255,255,0.05)]",
                      isActive && "bg-[rgba(255,255,255,0.08)] text-[#E8E6E3]",
                      isCollapsed && "justify-center px-3"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className={cn(
                      "transition-opacity duration-300",
                      isCollapsed && "opacity-0 w-0 hidden"
                    )}>
                      {item.name}
                    </span>
                  </div>
                );

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {item.external ? (
                            <a
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              {navContent}
                            </a>
                          ) : (
                            <Link
                              href={item.path}
                              onClick={(e) => {
                                handleSmoothScroll(e, item.path);
                                setIsMobileOpen(false);
                              }}
                            >
                              {navContent}
                            </Link>
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <>
                        {item.external ? (
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {navContent}
                          </a>
                        ) : (
                          <Link
                            href={item.path}
                            onClick={(e) => {
                              handleSmoothScroll(e, item.path);
                              setIsMobileOpen(false);
                            }}
                          >
                            {navContent}
                          </Link>
                        )}
                      </>
                    )}
                  </motion.div>
                );
              })}
            </TooltipProvider>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-[rgba(255,255,255,0.08)] space-y-3 flex-shrink-0">
            {session?.user && (
              isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center px-2 py-2">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full border border-white/20 flex-shrink-0"
                          unoptimized
                        />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div>
                      <p className="font-medium">{session.user.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{session.user.email}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full border border-white/20 flex-shrink-0"
                      unoptimized
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#E8E6E3] truncate">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-[rgba(232,230,227,0.70)] truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              )
            )}
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      signOut();
                      setIsMobileOpen(false);
                    }}
                    className="w-auto px-3 border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-[#E8E6E3]/70 hover:text-[#E8E6E3]"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Log Out</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  signOut();
                  setIsMobileOpen(false);
                }}
                className="w-full border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] text-[#E8E6E3]/70 hover:text-[#E8E6E3]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            )}
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}
