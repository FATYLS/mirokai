"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import MapButton from "@/components/MapButton";
import PrimaryButton from "@/components/PrimaryButton";

export default function Chapitre3Page() {
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
            3
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
            src="/images/chapter3-hero.jpg"
            alt="Chapitre 3 — La parole et l’écoute"
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
            La parole
          </span>
          <span className="text-outline block text-[30px] font-black uppercase">
            Et l’écoute
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
          Pour aider les humains, le Mirokaï doit aussi apprendre à communiquer.
          Écouter, répondre et choisir les bons mots lui permet de créer un vrai
          dialogue.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        className="relative z-20 mt-7 flex justify-center safe-bottom"
      >
        <PrimaryButton onClick={() => router.push("/mission-3")}>
          Suivant
        </PrimaryButton>
      </motion.section>
    </main>
  );
}
