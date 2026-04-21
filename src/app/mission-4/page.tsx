"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";

// The encoded word is "MIROKA" (6 letters).
// Each glyph maps to a letter via the alphabet legend at the bottom of the
// board. Tapping a glyph at the top of the board reveals the corresponding
// letter in the dash below it.
const ENCODED: { glyph: string; letter: string }[] = [
  { glyph: "/images/glyph-m.svg", letter: "M" },
  { glyph: "/images/glyph-i.svg", letter: "I" },
  { glyph: "/images/glyph-r.svg", letter: "R" },
  { glyph: "/images/glyph-o.svg", letter: "O" },
  { glyph: "/images/glyph-k.svg", letter: "K" },
  { glyph: "/images/glyph-a.svg", letter: "A" },
];

const ALPHABET: { glyph: string; letter: string }[] = [
  { glyph: "/images/glyph-k.svg", letter: "K" },
  { glyph: "/images/glyph-o.svg", letter: "O" },
  { glyph: "/images/glyph-i.svg", letter: "I" },
  { glyph: "/images/glyph-m.svg", letter: "M" },
  { glyph: "/images/glyph-a.svg", letter: "A" },
  { glyph: "/images/glyph-r.svg", letter: "R" },
];

export default function Mission4Page() {
  const router = useRouter();
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    Array(ENCODED.length).fill(false)
  );
  const [showHint, setShowHint] = useState(false);

  const allRevealed = revealed.every(Boolean);

  const reveal = useCallback((index: number) => {
    setRevealed((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!allRevealed) return;
    const timer = setTimeout(() => {
      router.push("/indice-4");
    }, 1200);
    return () => clearTimeout(timer);
  }, [allRevealed, router]);

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      {/* Progress locks : 3 ouverts / 1 fermé */}
      <div className="safe-top relative z-20 mt-6 flex items-center justify-center gap-5">
        <LockOpenIcon />
        <LockOpenIcon />
        <LockOpenIcon />
        <LockIcon />
      </div>

      {/* Info card with Miroji avatar */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 mx-auto mt-10 w-full max-w-[400px] px-4"
      >
        <div className="relative rounded-[24px] border border-[color:var(--rose-20)] bg-card px-4 py-5 backdrop-blur-md">
          <div className="absolute -left-2 -top-10 h-[117px] w-[117px]">
            <Image
              src="/images/miroji-q4.png"
              alt=""
              fill
              priority
              sizes="117px"
              className="drag-none object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-1 pl-[96px]">
            <p className="text-[14px] font-light text-white">Quête 4</p>
            <h1 className="text-center text-[20px] font-medium tracking-tight text-white">
              Retrouve le mot secret
            </h1>
            <p className="mt-1 text-[14px] font-light text-white">
              Indice&nbsp;: le puzzle
            </p>
          </div>
        </div>
      </motion.section>

      {/* Puzzle board */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        className="relative z-20 mx-auto mt-6 w-full max-w-[406px] px-3"
      >
        <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/10 p-5 shadow-[0_4px_24px_0_rgba(154,154,154,0.2)] backdrop-blur-sm">
          {/* Hint button */}
          <button
            type="button"
            onClick={() => setShowHint((s) => !s)}
            aria-label="Afficher l'indice"
            className="absolute right-4 top-4 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border-2 border-[color:var(--rose-20)] bg-black/10 transition active:scale-95"
          >
            <LightBulbIcon />
          </button>

          {/* Encoded glyphs (tap to reveal) */}
          <div className="mt-16 grid grid-cols-6 gap-2 px-1">
            {ENCODED.map((e, i) => (
              <button
                key={i}
                type="button"
                onClick={() => reveal(i)}
                disabled={revealed[i]}
                aria-label={`Déchiffrer la lettre ${i + 1}`}
                className="relative flex h-[54px] items-center justify-center rounded-lg transition active:scale-95 disabled:cursor-default"
              >
                <motion.div
                  animate={{
                    opacity: revealed[i] ? 0 : 1,
                    scale: revealed[i] ? 0.7 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={e.glyph}
                    alt=""
                    width={22}
                    height={28}
                    className="drag-none h-7 w-auto"
                  />
                </motion.div>
                {!revealed[i] && (
                  <span className="pointer-events-none absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-6 rounded-full bg-white/30" />
                )}
              </button>
            ))}
          </div>

          {/* Dashes + revealed letters */}
          <div className="mt-6 grid grid-cols-6 gap-2 px-1">
            {ENCODED.map((e, i) => (
              <div
                key={i}
                className="relative flex h-[42px] flex-col items-center justify-end"
              >
                <AnimatePresence>
                  {revealed[i] && (
                    <motion.span
                      key="letter"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-display text-[26px] font-bold leading-none text-text-primary"
                    >
                      {e.letter}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="mt-1 h-[2px] w-full rounded-full bg-white" />
              </div>
            ))}
          </div>

          {/* Alphabet legend */}
          <div className="mt-8 grid grid-cols-3 gap-x-2 gap-y-3 px-1 pb-2">
            {ALPHABET.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2"
              >
                <Image
                  src={a.glyph}
                  alt=""
                  width={18}
                  height={22}
                  className="drag-none h-5 w-auto"
                />
                <span className="font-display text-[22px] leading-none text-text-secondary">
                  = {a.letter}
                </span>
              </div>
            ))}
          </div>

          {/* Hint overlay */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center rounded-[32px] bg-black/60 p-8 text-center backdrop-blur-sm"
                onClick={() => setShowHint(false)}
              >
                <p className="text-[15px] leading-[1.5] text-white">
                  Souviens-toi du puzzle&nbsp;: c&rsquo;est le nom du personnage
                  que tu as assemblé.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success flash */}
          <AnimatePresence>
            {allRevealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-[32px] bg-gradient-to-t from-[#a2337d]/40 to-transparent pb-6"
              >
                <p className="font-display text-[22px] font-black tracking-tight text-white">
                  MIROKA !
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      <div className="flex-1" />
    </main>
  );
}

function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 10V7a6 6 0 1 1 12 0v3"
        stroke="#F19802"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        rx="2"
        stroke="#F19802"
        strokeWidth="2"
      />
    </svg>
  );
}

function LockOpenIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 10V7a6 6 0 0 1 11.5-2.3"
        stroke="#F19802"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        rx="2"
        stroke="#F19802"
        strokeWidth="2"
      />
    </svg>
  );
}

function LightBulbIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.6 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.5 1-2.1A7 7 0 0 0 12 2Z"
        stroke="#F5EFF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
