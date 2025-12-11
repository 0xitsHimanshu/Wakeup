"use client"

import { GL } from "@/components/gl"
import { GoogleSignInButton } from "@/components/google-sign-in-button"
import { Leva } from "leva"
import { useState } from "react"
import Link from "next/link"

export default function GetStartedPage() {
  const [hovering, setIsHovering] = useState(false)
  return (
    <>
      <div className="flex flex-col min-h-svh justify-center items-center px-4">
        <Link 
          href="/" 
          className="absolute top-8 left-6 md:left-8 z-20 font-mono text-sm text-white/60 hover:text-white/80 transition-colors duration-150"
        >
          ← back
        </Link>
        <GL hovering={hovering} />

        <div className="relative z-10 w-full max-w-md text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-4">
            Welcome <br />
            <i className="font-light instrument text-primary">aboard.</i>
          </h1>

          <p className="font-mono text-sm sm:text-base text-foreground/80 text-balance mt-6 max-w-[580px] mx-auto">
           jumpstart your journey by signing in with Google.
          </p>

          <div className="mt-12">
            <GoogleSignInButton 
              onHoverChange={(isHovering) => setIsHovering(isHovering)}
            />
          </div>

        </div>
      </div>
      <Leva hidden />
    </>
  )
}
