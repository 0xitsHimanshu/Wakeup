import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(55,50,47,0.12)] dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAF9] dark:bg-[#1A1917]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0">
          {/* Brand Name */}
          <div className="shrink-0 flex items-center gap-3">
            <Logo width="90px" height="100px" />
            <h2 className="italic font-thin text-4xl md:text-5xl lg:text-6xl font-bold text-[#49423D] dark:text-[#E8E6E3]">
              Wakeup
            </h2>
          </div>


          {/* Follow Us Section */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-[rgba(73,66,61,0.60)] dark:text-[rgba(232,230,227,0.60)] uppercase tracking-wider">
              FOLLOW US
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/0xHimansh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#49423D] dark:text-[#E8E6E3] hover:text-[#37322F] dark:hover:text-[#D2C6BF] transition-colors flex items-center gap-2 group"
              >
                𝕏
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/0xhimanshuyadav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#49423D] dark:text-[#E8E6E3] hover:text-[#37322F] dark:hover:text-[#D2C6BF] transition-colors flex items-center gap-2 group"
              >
                LinkedIn
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/0xitsHimanshu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#49423D] dark:text-[#E8E6E3] hover:text-[#37322F] dark:hover:text-[#D2C6BF] transition-colors flex items-center gap-2 group"
              >
                Github
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
