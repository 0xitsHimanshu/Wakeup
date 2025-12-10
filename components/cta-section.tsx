"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function CTASection() {
  const router = useRouter();
  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-center items-center gap-2">
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-12 border-t border-b border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] flex justify-center items-center gap-6 relative z-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-full rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] dark:outline-[rgba(255,255,255,0.08)] outline-offset-[-0.25px]"
                style={{
                  top: `${i * 16 - 120}px`,
                  left: "-100%",
                  width: "300%",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[586px] px-6 py-5 md:py-8 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-6 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] dark:text-[#E8E6E3] text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] font-sans tracking-tight">
              Ready to warm your{" "}
              <span className="italic text-[#FFA500]">Servers?</span>
            </div>
            <div className="self-stretch text-center text-[#605A57] dark:text-[rgba(232,230,227,0.70)] text-base leading-7 font-sans font-medium">
              Eliminate cold starts. Boost reliability. Keep your users happy
            </div>
          </div>
          <div className="w-full max-w-[497px] flex flex-col justify-center items-center gap-12">
            {/* <div className="flex justify-start items-center gap-4">
              <div className="h-10 px-12 py-[6px] relative bg-[#37322F] dark:bg-[#E8E6E3] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] dark:shadow-[0px_0px_0px_2.5px_rgba(0,0,0,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2A2520] dark:hover:bg-[#D2C6BF] transition-colors">
                <div className="w-44 h-[41px] absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="flex flex-col justify-center text-white dark:text-[#37322F] text-[13px] font-medium leading-5 font-sans">
                  
                  Start monitoring today.
                </div>
              </div>
            </div> */}

            <Button
              onClick={() => router.push("/getstarted")}
            >
              [Get Started]
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
