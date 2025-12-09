"use client"

interface FeatureCardProps {
  title: string
  description: string
  isActive: boolean
  progress: number
  onClick: () => void
}

export function FeatureCard({ title, description, isActive, progress, onClick }: FeatureCardProps) {
  return (
    <div
      className={`w-full md:flex-1 self-stretch px-6 py-5 overflow-hidden flex flex-col justify-start items-start gap-2 cursor-pointer relative border-b md:border-b-0 last:border-b-0 transition-colors ${
        isActive
          ? "bg-white dark:bg-[#1C1A18] shadow-[0px_0px_0px_0.75px_#E0DEDB_inset] dark:shadow-[0px_0px_0px_0.75px_rgba(255,255,255,0.1)_inset]"
          : "border-l-0 border-r-0 md:border border-[#E0DEDB]/80 dark:border-[rgba(255,255,255,0.08)]"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-[rgba(50,45,43,0.08)] dark:bg-[rgba(255,255,255,0.08)]">
          <div
            className="h-full bg-[#322D2B] dark:bg-[#E8E6E3] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="self-stretch flex justify-center flex-col text-[#49423D] dark:text-[#E8E6E3] text-sm md:text-sm font-semibold leading-6 md:leading-6 font-sans">
        {title}
      </div>
      <div className="self-stretch text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-[13px] md:text-[13px] font-normal leading-[22px] md:leading-[22px] font-sans">
        {description}
      </div>
    </div>
  )
}
