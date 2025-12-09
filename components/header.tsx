"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

const navItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Features",
    path: "#features",
  },
  {
    name: "FAQ",
    path: "#faq",
  },
  {
    name: "Github",
    path: "https://github.com/0xitsHimanshu/Wakeup",
  },
];

export const Header = () => {
  const pathname = usePathname() || "/";
  const [hoveredPath, setHoveredPath] = useState(pathname);
  const router = useRouter();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <div className="absolute z-50 pt-8 md:pt-14 top-0 left-0 w-full pointer-events-none">
      <nav className="w-full bg-transparent pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo className="w-[100px] md:w-[120px]" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 px-5 border border-white/20 rounded-full backdrop-blur-sm">
                {navItem.map((item, index) => {
                  const isActive = item.path === pathname;
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      onClick={(e) => handleSmoothScroll(e, item.path)}
                      className={`relative text-white hover:text-gray-400/60 py-2 px-4 rounded-md text-base duration-300 ease-in ${
                        isActive ? "text-primary" : ""
                      }`}
                      data-active={isActive}
                      onMouseOver={() => setHoveredPath(item.path)}
                      onMouseLeave={() => setHoveredPath(pathname)}
                    >
                      <span>{item.name}</span>
                      {item.path === hoveredPath && (
                        <motion.div
                          className="absolute inset-0 bg-gray-500/30 rounded-full -z-10"
                          layoutId="navbar"
                          aria-hidden="true"
                          transition={{
                            type: "spring",
                            bounce: 1,
                            stiffness: 130,
                            damping: 9,
                            duration: 0.3,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}

              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button
                className="uppercase max-lg:hidden transition-colors ease-out duration-150  font-mono hover:text-white/80 rounded-full
                  bg-background border-primary text-primary-foreground [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#EBB800] hover:shadow-[#EBB800]/80
                "
                onClick={() => router.push("/getstarted")}
              >
                Sign In
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};
