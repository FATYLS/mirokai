"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type QuestCardProps = {
  title: string;
  subtitle: string;
  bgSrc: string;
  locked?: boolean;
  /** When true, the card is still "locked" visually (lock icon) but playable with a "Jouer" CTA. */
  playable?: boolean;
  onClick?: () => void;
  delay?: number;
};

export default function QuestCard({
  title,
  subtitle,
  bgSrc,
  locked = false,
  playable = false,
  onClick,
  delay = 0,
}: QuestCardProps) {
  const disabled = locked && !playable;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        "relative block h-[100px] w-full overflow-hidden rounded-3xl border-2 border-[rgba(196,181,253,0.25)] text-left",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <Image
        src={bgSrc}
        alt=""
        fill
        sizes="400px"
        className={cn(
          "pointer-events-none select-none object-cover",
          disabled ? "opacity-40" : "opacity-70",
        )}
      />
      {disabled && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#000f23]/40 via-[#000f23]/55 to-[#002c68]/90" />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_4px_100px_0_#002c68]" />

      <div className="relative flex h-full items-center gap-3 px-4">
        <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center text-violet-10">
          {locked ? <LockIcon /> : <PlanetIcon />}
        </div>
        <div className="min-w-0 flex-1 pr-2">
          <p className="truncate font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-violet-10">
            {title}
          </p>
          <p className="truncate text-[14px] leading-tight text-violet-10/90">
            {subtitle}
          </p>
        </div>
        {playable && (
          <div className="flex flex-shrink-0 items-center gap-1 pr-1 text-violet-10">
            <span className="text-[15px] font-medium">Jouer</span>
            <ChevronRight />
          </div>
        )}
      </div>
    </motion.button>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 14c4 2.5 10 3 18 1M21 10c-4-2.5-10-3-18-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 27" fill="none" aria-hidden>
      <rect
        x="2"
        y="10"
        width="20"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 10V6a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
