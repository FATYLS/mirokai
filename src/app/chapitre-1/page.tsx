"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import MapButton from "@/components/MapButton";
import PrimaryButton from "@/components/PrimaryButton";

export default function Chapitre1Page() {
  const router = useRouter();

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-between px-5 pt-6">
        <div className="font-display leading-[0.95] tracking-[-0.02em]">
          <span className="inline-block align-middle text-[38px] font-black text-text-primary">
            CHAPITRE
          </span>
          <span className="text-outline ml-3 inline-block align-middle text-[38px] font-black">
            1
          </span>
        </div>
        <MapButton className="mt-1" />
      </header>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 mt-6 px-5"
      >
        <div className="relative aspect-[400/285] w-full overflow-hidden rounded-3xl border-2 border-[color:var(--rose-20)]">
          <Image
            src="/images/chapter1-hero.jpg"
            alt="Chapitre 1 — Comprendre les humains"
            fill
            priority
            sizes="400px"
            className="object-cover"
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="relative z-20 mt-6 px-5"
      >
        <h1 className="font-display leading-[0.95] tracking-[-0.02em]">
          <span className="block text-[30px] font-black uppercase text-text-primary">
            Comprendre
          </span>
          <span className="text-outline block text-[30px] font-black uppercase">
            Les humains
          </span>
        </h1>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="relative z-20 mt-4 px-5"
      >
        <p className="text-[15px] leading-[1.5] text-text-primary">
          En arrivant sur Terre, le Mirokaï découvre quelque chose de
          fascinant&nbsp;: les émotions humaines. Les visages, les regards et
          les expressions lui apprennent à comprendre ce que ressentent les
          personnes qu’il rencontre.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        className="relative z-20 mt-7 flex justify-center safe-bottom"
      >
        <PrimaryButton onClick={() => router.push("/mission-1")}>
          Suivant
        </PrimaryButton>
      </motion.section>
    </main>
  );
}
