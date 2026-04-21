import Image from "next/image";
import { cn } from "@/lib/cn";

export default function MirokaiSchematic({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute left-1/2 top-[18%] h-[80%] w-[78%] -translate-x-1/2">
        <Image
          src="/images/schema-visage.png"
          alt=""
          fill
          sizes="260px"
          className="pointer-events-none select-none object-contain"
        />
      </div>
      <div className="absolute left-1/2 top-0 h-[92%] w-[100%] -translate-x-1/2">
        <Image
          src="/images/schema-oreilles.png"
          alt=""
          fill
          sizes="320px"
          className="pointer-events-none select-none object-contain"
        />
      </div>
      <div className="absolute left-1/2 top-[40%] h-[22%] w-[52%] -translate-x-1/2">
        <Image
          src="/images/schema-yeux.png"
          alt=""
          fill
          sizes="180px"
          className="pointer-events-none select-none object-contain"
        />
      </div>
    </div>
  );
}
