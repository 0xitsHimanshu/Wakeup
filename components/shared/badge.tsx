import type React from "react"

interface BadgeProps {
  icon: React.ReactNode
  text: string
}

export function Badge({ icon, text }: BadgeProps) {
  return (
    <div className="px-[14px] py-[6px] bg-white dark:bg-[#1C1A18] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] dark:shadow-[0px_0px_0px_4px_rgba(255,255,255,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] dark:border-[rgba(255,255,255,0.12)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center [&_svg]:dark:stroke-[#E8E6E3] [&_svg_rect]:dark:stroke-[#E8E6E3] [&_svg_rect]:dark:fill-[#E8E6E3]">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] dark:text-[#E8E6E3] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}
