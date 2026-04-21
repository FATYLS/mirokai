"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";

// Board dimensions reproduced from Figma (Puzzle 2 container is 406×462 at
// absolute (17, 455)). We scale it down to fit a 380-wide board on mobile.
const BOARD_W = 380;
const BOARD_H = 430;
const SCALE = BOARD_W / 406;

const s = (v: number) => Math.round(v * SCALE);

// The tableau (pre-composed from the 6 Figma pieces) sits inside the board at
// the bounding box (77, 52) → (328, 379) — width 251, height 327 in Figma
// units.
const PAINTING_X = 77;
const PAINTING_Y = 52;
const PAINTING_W = 251;
const PAINTING_H = 327;

// 6 glyphs overlayed at the 4 corners + 2 side-middles of the painting.
const GLYPHS: { src: string; x: number; y: number }[] = [
  { src: "/images/glyph-m.svg", x: 92, y: 68 }, // top-left
  { src: "/images/glyph-i.svg", x: 296, y: 68 }, // top-right
  { src: "/images/glyph-r.svg", x: 92, y: 166 }, // mid-left
  { src: "/images/glyph-o.svg", x: 301, y: 168 }, // mid-right
  { src: "/images/glyph-k.svg", x: 86, y: 350 }, // bottom-left
  { src: "/images/glyph-a.svg", x: 303, y: 352 }, // bottom-right
];

export default function Indice4Page() {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.search.includes("stay")
    )
      return;
    const t = setTimeout(() => router.push("/validation-4"), 3200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      <div className="safe-top relative z-20 mt-6 flex items-center justify-center gap-5">
        <LockOpenIcon />
        <LockOpenIcon />
        <LockOpenIcon />
        <LockIcon />
      </div>

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
            <h1 className="text-center text-[24px] font-medium tracking-tight text-white">
              Indice
            </h1>
            <p className="mt-1 text-[14px] font-light text-white">
              Présent dans le tableau
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        className="relative z-20 mx-auto mt-6 px-3"
      >
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/10 shadow-[0_4px_24px_0_rgba(154,154,154,0.2)] backdrop-blur-sm"
          style={{ width: BOARD_W, height: BOARD_H }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="absolute"
            style={{
              left: s(PAINTING_X),
              top: s(PAINTING_Y),
              width: s(PAINTING_W),
              height: s(PAINTING_H),
            }}
          >
            <Image
              src="/images/tableau-mirokai.png"
              alt="Tableau des Mirokaï"
              fill
              priority
              sizes={`${s(PAINTING_W)}px`}
              className="drag-none select-none object-contain"
            />
          </motion.div>

          {GLYPHS.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.9 + i * 0.12,
                ease: "backOut",
              }}
              className="absolute z-10 flex h-5 w-4 items-center justify-center"
              style={{
                left: s(g.x) - 8,
                top: s(g.y) - 10,
              }}
            >
              <Image
                src={g.src}
                alt=""
                width={16}
                height={20}
                className="drag-none h-full w-auto"
              />
            </motion.div>
          ))}
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
