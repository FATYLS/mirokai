"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import MapButton from "@/components/MapButton";
import PrimaryButton from "@/components/PrimaryButton";

export default function Validation1Page() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-end px-5 pt-6">
        <MapButton />
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-20 mt-3 flex items-center justify-center gap-5"
      >
        <LockOpenIcon />
        <LockIcon />
        <LockIcon />
        <LockIcon />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-20 mt-8 px-5"
      >
        <div className="flex h-[54px] items-center justify-center rounded-[20px] border border-[color:var(--rose-20)] px-4">
          <p className="text-[18px] font-medium tracking-tight text-text-primary">
            Tête du robot
          </p>
        </div>
      </motion.section>

      <div className="relative z-10 mt-4 flex flex-1 flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative h-[320px] w-full max-w-[380px]"
        >
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src="/images/robot-head.png"
              alt=""
              fill
              priority
              sizes="380px"
              className="select-none object-contain"
            />
          </motion.div>

          <div className="absolute left-1/2 top-1/2 h-[75%] w-[62%] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/robot-head-only.png"
              alt="Tête du Mirokaï robot"
              fill
              priority
              sizes="240px"
              className="pointer-events-none select-none object-contain"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-2 font-display text-[44px] font-black tracking-[-0.02em] text-text-primary"
        >
          EXCELLENT !
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-2 max-w-[300px] text-center text-[15px] leading-[1.45] text-white"
        >
          Tu as réussi la première épreuve.
          <br />
          Grâce à toi, les Mirokaï comprennent mieux les émotions des humains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-7 safe-bottom pb-8"
        >
          <PrimaryButton onClick={() => router.push("/quests-2")}>
            Épreuve suivante
          </PrimaryButton>
        </motion.div>
      </div>
    </main>
  );
}

function LockIcon() {
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
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="#f19802"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
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
