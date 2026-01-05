import { cn } from "@/lib/utils";

export const SectionWrapper = ({
    children,
    className,
}: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("max-w-350 mx-auto", className)}>
      {children}
    </div>
  );
}