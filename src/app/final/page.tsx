"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";

export default function FinalPage() {
  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="safe-top relative z-20 mt-6 flex items-center justify-center gap-5"
      >
        <LockOpenIcon />
        <LockOpenIcon />
        <LockOpenIcon />
        <LockOpenIcon />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="relative z-20 mx-auto mt-16 w-full max-w-[400px] px-4"
      >
        <div className="relative h-[551px] overflow-hidden rounded-[24px] border border-[color:var(--rose-20)] shadow-[0_4px_40px_0_rgba(0,0,0,0.2)]">
          <div className="pointer-events-none absolute inset-0 scale-110">
            <Image
              src="/images/mission-card-bg.jpg"
              alt=""
              fill
              priority
              sizes="440px"
              className="select-none object-cover blur-[14px] saturate-125"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 70% at 50% 40%, rgba(255,193,224,0.35) 0%, rgba(157,114,200,0.25) 40%, rgba(0,15,35,0.6) 100%)",
            }}
          />

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="relative z-10 mt-6 px-6 text-center font-display text-[32px] font-medium tracking-tight text-white"
          >
            Mission accomplie&nbsp;!
          </motion.h1>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[270px] z-10 h-[296px] w-[296px] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/magic-ring-final.png"
                alt=""
                fill
                priority
                sizes="296px"
                className="select-none object-contain"
              />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[89px] z-20 h-[450px] w-[171px] -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/mirokai-complet.png"
                alt="Mirokaï complet"
                fill
                priority
                sizes="171px"
                className="select-none object-contain"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="flex-1" />
    </main>
  );
}

function LockOpenIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 24 27" fill="none" aria-hidden>
      <rect
        x="3"
        y="11"
        width="18"
        height="14"
        rx="2.5"
        stroke="#f19802"
        strokeWidth="2"
      />
      <path
        d="M2 11V7a5 5 0 0 1 9-3"
        stroke="#f19802"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
