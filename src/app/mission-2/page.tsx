"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import MapButton from "@/components/MapButton";
import PrimaryButton from "@/components/PrimaryButton";
import { cn } from "@/lib/cn";

const CORRECT_SENTENCE = [
  "Nimira",
  "est",
  "une",
  "planète",
  "magique",
  "où",
  "vivent",
  "les",
  "Mikoraï",
];

const SCRAMBLED = [
  "planète",
  "est",
  "vivent",
  "magique",
  "Nimira",
  "une",
  "où",
  "Mikoraï",
  "les",
];

type Status = "idle" | "correct" | "wrong";

export default function Mission2Page() {
  const router = useRouter();
  const [available, setAvailable] = useState<string[]>(SCRAMBLED);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const handleSelect = useCallback((word: string, idx: number) => {
    setStatus("idle");
    setAvailable((prev) => prev.filter((_, i) => i !== idx));
    setSelected((prev) => [...prev, word]);
  }, []);

  const handleUnselect = useCallback((idx: number) => {
    setStatus("idle");
    setSelected((prev) => {
      const word = prev[idx];
      setAvailable((a) => [...a, word]);
      return prev.filter((_, i) => i !== idx);
    });
  }, []);

  const isFull = selected.length === CORRECT_SENTENCE.length;

  const handleValidate = useCallback(() => {
    if (!isFull) return;
    const ok = selected.every((w, i) => w === CORRECT_SENTENCE[i]);
    setStatus(ok ? "correct" : "wrong");
  }, [isFull, selected]);

  useEffect(() => {
    if (status !== "correct") return;
    const t = setTimeout(() => router.push("/validation-2"), 1200);
    return () => clearTimeout(t);
  }, [status, router]);

  useEffect(() => {
    if (status !== "wrong") return;
    const t = setTimeout(() => setStatus("idle"), 1500);
    return () => clearTimeout(t);
  }, [status]);

  const validateDisabled = !isFull || status !== "idle";

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-end px-5 pt-6">
        <MapButton />
      </header>

      <div className="relative z-20 mt-3 flex justify-center gap-4">
        <LockOpenIcon />
        <LockIcon />
        <LockIcon />
        <LockIcon />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 mt-10 px-5"
      >
        <div className="relative rounded-3xl border border-[color:var(--rose-20)] bg-card px-5 pb-5 pl-[110px] pt-5 backdrop-blur-md">
          <div className="pointer-events-none absolute -left-4 -top-12 h-[125px] w-[125px] -rotate-[12deg]">
            <Image
              src="/images/miroji-thinking.png"
              alt=""
              fill
              sizes="125px"
              className="object-contain"
            />
          </div>
          <p className="text-[15px] font-light text-white/90">Mission</p>
          <p className="mt-2 text-[15px] leading-[1.45] text-white">
            Réorganise les mots dans le bon ordre pour retrouver la bonne
            phrase.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "relative z-20 mx-5 mt-5 min-h-[70px] rounded-2xl border border-dashed px-3 py-3 transition-colors",
          status === "correct"
            ? "border-[#66d79a] bg-[#66d79a]/10"
            : status === "wrong"
              ? "border-[#ff8f8f] bg-[#ff8f8f]/10"
              : "border-[rgba(236,213,229,0.2)] bg-white/[0.03]",
        )}
      >
        {selected.length === 0 ? (
          <p className="flex h-full items-center justify-center py-2 text-center text-[13px] text-white/50">
            Tape sur les mots ci-dessous pour construire ta phrase
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {selected.map((word, i) => (
                <motion.button
                  key={`sel-${i}-${word}`}
                  type="button"
                  onClick={() => handleUnselect(i)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[18px] border border-[rgba(236,213,229,0.4)] bg-white/[0.08] px-4 py-2 text-[17px] font-medium text-text-primary"
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.section>

      <section className="relative z-20 mt-6 flex flex-wrap justify-center gap-2.5 px-4">
        <AnimatePresence initial={false}>
          {available.map((word, i) => (
            <motion.button
              key={`av-${word}-${i}`}
              type="button"
              onClick={() => handleSelect(word, i)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-[24px] border border-[color:var(--rose-20)] bg-transparent px-5 py-3 text-[20px] font-medium text-text-primary"
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {status === "wrong" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-20 mt-5 text-center text-[14px] text-[#ffb0b0]"
          >
            Ce n’est pas la bonne phrase, réessaie !
          </motion.p>
        )}
        {status === "correct" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-20 mt-5 text-center text-[14px] text-[#9ff0c2]"
          >
            Bravo&nbsp;!
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative z-20 mt-8 flex justify-center safe-bottom pb-10">
        <PrimaryButton onClick={handleValidate} disabled={validateDisabled}>
          Valider
        </PrimaryButton>
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
