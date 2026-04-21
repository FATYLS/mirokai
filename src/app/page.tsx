"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";

export default function SplashPage() {
  const router = useRouter();

  const goNext = useCallback(() => {
    router.push("/choose");
  }, [router]);

  return (
    <main
      role="button"
      tabIndex={0}
      aria-label="Entrer dans l'expérience Mirokaï"
      onClick={goNext}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goNext();
        }
      }}
      className="no-select relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden"
    >
      <StarfieldBackground />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-[7vh] flex w-[78%] max-w-[340px] justify-center safe-top"
      >
        <Image
          src="/images/logo-mirokai-experience.png"
          alt="Mirokaï Experience"
          width={720}
          height={350}
          priority
          className="drag-none h-auto w-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50 || info.velocity.y < -250) goNext();
        }}
        className="relative z-10 mt-auto flex w-full flex-1 items-end justify-center"
      >
        <Image
          src="/images/duo-poster.png"
          alt="Miroki et Miroka"
          width={880}
          height={1031}
          priority
          className="drag-none pointer-events-none h-auto w-full object-cover"
        />
      </motion.div>

      <motion.div
        className="safe-bottom pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-2 pb-4 text-text-primary/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          aria-hidden
          className="h-6 w-[1.5px] bg-text-primary/70"
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Glisser ou toucher
        </span>
      </motion.div>
    </main>
  );
}
