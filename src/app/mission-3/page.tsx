"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";

type Piece = {
  id: number;
  src: string;
  width: number;
  height: number;
  scatter: { left: number; top: number; rotate: number };
  placed: { left: number; top: number; rotate: number };
};

// Board dimensions — matches the Figma "Fond puzzle" plus the scatter zone above it.
// Piece positions use Figma's exact coordinates inside the drop zone so the
// assembled picture matches the reference design 1:1.
const BOARD_W = 340;
const BOARD_H = 560;
const DROP_Y = 130;
const SCALE = BOARD_W / 406; // scale from Figma 406-wide to current board

const sx = (v: number) => Math.round(v * SCALE);
const sy = (v: number) => Math.round(v * SCALE);

const PIECES: Piece[] = [
  {
    id: 1,
    src: "/images/puzzle-p1.png",
    width: sx(156),
    height: sy(109),
    scatter: { left: sx(90), top: 38, rotate: 6 },
    placed: { left: sx(72), top: DROP_Y + sy(58), rotate: 0 },
  },
  {
    id: 2,
    src: "/images/puzzle-p2.png",
    width: sx(126),
    height: sy(139),
    scatter: { left: sx(36), top: 24, rotate: -11 },
    placed: { left: sx(197), top: DROP_Y + sy(58), rotate: 0 },
  },
  {
    id: 3,
    src: "/images/puzzle-p3.png",
    width: sx(126),
    height: sy(139),
    scatter: { left: sx(180), top: 0, rotate: 4 },
    placed: { left: sx(72), top: DROP_Y + sy(167), rotate: 0 },
  },
  {
    id: 4,
    src: "/images/puzzle-p4.png",
    width: sx(159),
    height: sy(109),
    scatter: { left: sx(60), top: 94, rotate: -4 },
    placed: { left: sx(164), top: DROP_Y + sy(167), rotate: 0 },
  },
  {
    id: 5,
    src: "/images/puzzle-p5.png",
    width: sx(155),
    height: sy(109),
    scatter: { left: sx(140), top: 48, rotate: 22 },
    placed: { left: sx(72), top: DROP_Y + sy(276), rotate: 0 },
  },
  {
    id: 6,
    src: "/images/puzzle-p6.png",
    width: sx(126),
    height: sy(139),
    scatter: { left: sx(240), top: 60, rotate: -3 },
    placed: { left: sx(197), top: DROP_Y + sy(246), rotate: 0 },
  },
];

export default function Mission3Page() {
  const router = useRouter();
  const [placed, setPlaced] = useState<Set<number>>(new Set());

  const handlePlace = useCallback((id: number) => {
    setPlaced((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const allPlaced = placed.size === PIECES.length;

  useEffect(() => {
    if (!allPlaced) return;
    const t = setTimeout(() => router.push("/validation-3"), 1400);
    return () => clearTimeout(t);
  }, [allPlaced, router]);

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <StarfieldBackground />

      <div className="safe-top relative z-20 flex justify-center gap-4 pt-12">
        <LockOpenIcon />
        <LockOpenIcon />
        <LockIcon />
        <LockIcon />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 mt-4 px-5"
      >
        <div className="relative h-[122px] rounded-3xl border border-[color:rgba(196,181,253,0.25)] bg-card backdrop-blur-md">
          <div className="pointer-events-none absolute -left-4 -top-1 h-[117px] w-[117px]">
            <Image
              src="/images/miroji-question.png"
              alt=""
              fill
              sizes="117px"
              className="object-contain"
            />
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-0.5 pl-[90px] pr-4 text-center">
            <p className="text-[14px] font-light text-white">Question 3</p>
            <p className="font-display text-[22px] font-semibold tracking-[-0.01em] text-white">
              Puzzle de navigation
            </p>
            <p className="text-[14px] font-light text-white">
              Trouve l’objet caché&nbsp;!
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="relative z-10 mx-auto mt-5 safe-bottom"
        style={{ width: BOARD_W, height: BOARD_H }}
      >
        <div
          className="absolute inset-x-0 rounded-[35px] border border-[#d7d0d0] bg-white/[0.15] shadow-[0_4px_18px_-4px_rgba(0,0,0,0.3)] backdrop-blur-[2px]"
          style={{ top: DROP_Y, height: BOARD_H - DROP_Y }}
          aria-hidden
        />

        {PIECES.map((piece) => {
          const isPlaced = placed.has(piece.id);
          return (
            <motion.button
              key={piece.id}
              type="button"
              aria-label={`Pièce ${piece.id}`}
              onClick={() => handlePlace(piece.id)}
              disabled={isPlaced}
              initial={false}
              animate={
                isPlaced
                  ? {
                      left: piece.placed.left,
                      top: piece.placed.top,
                      rotate: piece.placed.rotate,
                    }
                  : {
                      left: piece.scatter.left,
                      top: piece.scatter.top,
                      rotate: piece.scatter.rotate,
                    }
              }
              transition={{
                duration: 0.65,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileTap={isPlaced ? undefined : { scale: 0.94 }}
              style={{
                width: piece.width,
                height: piece.height,
                zIndex: isPlaced ? 5 + piece.id : 30 + piece.id,
                position: "absolute",
              }}
              className="cursor-pointer border-0 bg-transparent p-0 disabled:cursor-default"
            >
              <div className="relative h-full w-full">
                <Image
                  src={piece.src}
                  alt=""
                  fill
                  sizes={`${piece.width}px`}
                  className="drag-none object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                  priority
                />
                {!isPlaced && (
                  <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22px] font-normal tracking-[-0.01em] text-[#c5c1c1]">
                    {piece.id}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.section>

      {allPlaced && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 mt-2 text-center font-display text-[18px] font-semibold text-[#9ff0c2]"
        >
          Bravo&nbsp;!
        </motion.p>
      )}
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
