"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import MapButton from "@/components/MapButton";
import FaceCard, { type FaceCardProps } from "@/components/FaceCard";

type FaceData = Pick<FaceCardProps, "src" | "col" | "row" | "emotion" | "borderClass"> & {
  id: string;
  rotation: number;
  width: number;
  height: number;
  left: string;
  top: string;
  z: number;
};

const FACES: FaceData[] = [
  {
    id: "surprise",
    emotion: "Surprise",
    src: "/images/faces-a.png",
    col: 0,
    row: 1,
    borderClass: "border-[#b8d0ff]/70",
    rotation: -8,
    width: 165,
    height: 155,
    left: "6%",
    top: "0px",
    z: 3,
  },
  {
    id: "degout",
    emotion: "Dégoût",
    src: "/images/faces-c.png",
    col: 2,
    row: 0,
    borderClass: "border-[#f0d67c]/80",
    rotation: 14,
    width: 170,
    height: 160,
    left: "50%",
    top: "10px",
    z: 1,
  },
  {
    id: "colere",
    emotion: "Colère",
    src: "/images/faces-b.png",
    col: 2,
    row: 0,
    borderClass: "border-[#ffb08a]/80",
    rotation: 8,
    width: 170,
    height: 155,
    left: "46%",
    top: "25px",
    z: 3,
  },
  {
    id: "joie-ghost",
    emotion: "Joie",
    src: "/images/faces-c.png",
    col: 0,
    row: 0,
    borderClass: "border-[#e6c666]/90",
    rotation: -26,
    width: 180,
    height: 175,
    left: "-6%",
    top: "115px",
    z: 2,
  },
  {
    id: "joie",
    emotion: "Joie",
    src: "/images/faces-c.png",
    col: 0,
    row: 0,
    borderClass: "border-[#f0d67c]/80",
    rotation: -18,
    width: 185,
    height: 175,
    left: "4%",
    top: "140px",
    z: 4,
  },
  {
    id: "tristesse",
    emotion: "Tristesse",
    src: "/images/faces-a.png",
    col: 1,
    row: 0,
    borderClass: "border-[#b8d0ff]/70",
    rotation: 10,
    width: 175,
    height: 165,
    left: "42%",
    top: "150px",
    z: 3,
  },
  {
    id: "peur",
    emotion: "Peur",
    src: "/images/faces-a.png",
    col: 2,
    row: 1,
    borderClass: "border-[#d9c3e8]/80",
    rotation: 4,
    width: 175,
    height: 165,
    left: "28%",
    top: "290px",
    z: 5,
  },
];

const REQUIRED_IDS = FACES.filter((f) => f.id !== "joie-ghost").map((f) => f.id);

export default function Mission1Page() {
  const router = useRouter();
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const handleFlip = useCallback((id: string, isFlipped: boolean) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (isFlipped) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const allFlipped = REQUIRED_IDS.every((id) => flipped.has(id));

  useEffect(() => {
    if (!allFlipped) return;
    const t = setTimeout(() => router.push("/validation-1"), 900);
    return () => clearTimeout(t);
  }, [allFlipped, router]);

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-end px-5 pt-6">
        <MapButton />
      </header>

      <div className="relative z-20 mt-3 flex justify-center gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LockIcon key={i} />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 mt-10 px-5"
      >
        <div className="relative rounded-3xl border border-[rgba(196,181,253,0.25)] bg-card px-4 pb-5 pt-8 backdrop-blur-md">
          <div className="pointer-events-none absolute -left-2 -top-10 h-[110px] w-[110px]">
            <Image
              src="/images/miroji-question.png"
              alt=""
              fill
              sizes="110px"
              className="object-contain"
            />
          </div>
          <p className="text-center text-[15px] font-light text-white/90">
            Mission 1
          </p>
          <p className="mx-auto mt-2 max-w-[280px] text-center font-display text-[22px] font-semibold leading-[1.25] text-white">
            Associe les visages et les émotions
          </p>
        </div>
      </motion.section>

      <section className="relative z-10 mx-auto mt-6 h-[500px] w-full max-w-[400px] px-2">
        {FACES.map((face, i) => (
          <motion.div
            key={face.id}
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + i * 0.08,
              ease: "easeOut",
            }}
            className="absolute"
            style={{ left: face.left, top: face.top, zIndex: face.z }}
          >
            <FaceCard
              src={face.src}
              col={face.col}
              row={face.row}
              emotion={face.emotion}
              borderClass={face.borderClass}
              rotation={face.rotation}
              width={face.width}
              height={face.height}
              onFlip={(f) => handleFlip(face.id, f)}
            />
          </motion.div>
        ))}
      </section>
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
