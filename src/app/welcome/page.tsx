"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-between px-5 pt-6">
        <PageTitle top="RENCONTREZ" bottom="LES MIROKAÏ" />
        <button
          type="button"
          aria-label="Ouvrir la carte"
          className="relative mt-1 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border-2 border-[color:var(--rose-20)] text-text-primary transition active:scale-95"
        >
          <span
            aria-hidden
            className="absolute -top-[13px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[9.5px] border-b-[12px] border-x-transparent border-b-[color:var(--rose-20)]"
          />
          <span
            aria-hidden
            className="absolute -top-[10px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-ink-start"
          />
          <MapIcon />
        </button>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-20 mt-5 px-5"
      >
        <p className="text-[15px] leading-[1.5] text-text-primary/95">
          Découvre comment les robots prennent vie grâce à l’imagination, à la
          technologie… et à une énergie magique appelée Mirium.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-20 mt-6 flex justify-center"
      >
        <PrimaryButton onClick={() => router.push("/quests")}>
          Commencer les quêtes
        </PrimaryButton>
      </motion.section>

      <div className="relative z-10 mt-6 flex-1">
        <div className="pointer-events-none absolute left-1/2 top-[4%] h-[95%] w-[115%] -translate-x-1/2">
          <Image
            src="/images/magic-ring.png"
            alt=""
            fill
            priority
            sizes="500px"
            className="drag-none select-none object-contain"
          />
          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 top-[8%] flex items-end justify-center"
        >
          <div className="relative h-full w-[82%] max-w-[360px]">
            <Image
              src="/images/miroka-profile.png"
              alt="Miroka"
              fill
              priority
              sizes="360px"
              className="drag-none pointer-events-none select-none object-contain object-bottom"
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function MapIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M4 8l8-3 8 3 8-3v19l-8 3-8-3-8 3V8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 5v19M20 8v19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
