import { cn } from "@/lib/cn";

export default function PageTitle({
  top,
  bottom,
  className,
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  return (
    <div className={cn("font-display leading-[0.95] tracking-[-0.02em]", className)}>
      <span className="block text-[38px] font-black text-text-primary">
        {top}
      </span>
      <span className="text-outline block text-[38px] font-black">
        {bottom}
      </span>
    </div>
  );
}
