"use client"

import { Badge } from "./shared/badge"
import { DecorativePattern } from "./shared/decorative-pattern"
import SmartSimpleBrilliant from "./features/smart-simple-brilliant"
import YourWorkInSync from "./features/your-work-in-sync"
import EffortlessIntegration from "./features/effortless-integration-updated"
import NumbersThatSpeak from "./features/numbers-that-speak"
import Image from "next/image"

export function BentoGrid() {
  return (
    <div id="features" className="w-full border-b border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <div className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-[#49423D] dark:text-[#E8E6E3] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Why Choose Us?
          </div>
          <div className="self-stretch text-center text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            <i><strong>Wakeup</strong></i> keeps your apps, APIs and server 24/7 awake
            <br />
            with automatic pings so you never miss a beat.
          </div>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 border border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden">
          {/* Top Left - Lightning fast setup */}
          <div className="border-b border-r-0 md:border-r border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] dark:text-[#E8E6E3] text-lg sm:text-xl font-semibold leading-tight font-sans">
                Lightning-Fast Setup
              </h3>
              <p className="text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-sm md:text-base font-normal leading-relaxed font-sans">
                Add you endpoint and you're done--no complicated config, no techinal overhead,no frustration.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden">
              <Image src="/Lightning_Fast_SETUP.png" alt="Lightning Fast Setup" width={400} height={300} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Top Right - Serverless platform often sleep */}
          <div className="border-b border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] dark:text-[#E8E6E3] font-semibold leading-tight font-sans text-lg sm:text-xl">
                Stop cold starts.
              </h3>
              <p className="text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-sm md:text-base font-normal leading-relaxed font-sans">
                Serverless platform often sleep... and you users feel the slowdown. Keep functions warm and responsive with Wakeup.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden text-right items-center justify-center">
              <YourWorkInSync width="400" height="250" theme="light" className="scale-60 sm:scale-75 md:scale-90" />
            </div>
          </div>

          {/* Bottom Left - Automated health checks every 10 minutes */}
          <div className="border-r-0 md:border-r border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6 bg-transparent">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] dark:text-[#E8E6E3] text-lg sm:text-xl font-semibold leading-tight font-sans">
                Automated health checks every 10 minutes
              </h3>
              <p className="text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-sm md:text-base font-normal leading-relaxed font-sans">
                Ensure your apps are always responsive with Wakeup's reliable pings that keep them awake and ready for action.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden justify-center items-center relative bg-transparent">
              <div className="w-full h-full flex items-center justify-center bg-transparent">
                <EffortlessIntegration width={400} height={250} className="max-w-full max-h-full" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] dark:from-[#0F0E0D] to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Bottom Right - Numbers that speak */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] dark:text-[#E8E6E3] text-lg sm:text-xl font-semibold leading-tight font-sans">
                Smart, Flexible Notification
              </h3>
              <p className="text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-sm md:text-base font-normal leading-relaxed font-sans">
                Get notified the way you like- instantly and reliably.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <EffortlessIntegration width={400} height={250} className="max-w-full max-h-full" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] dark:from-[#0F0E0D] to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
