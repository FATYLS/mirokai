"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type FaceCardProps = {
  src: string;
  /** column index (0..2) in the 3x2 composite source */
  col: 0 | 1 | 2;
  /** row index (0..1) in the 3x2 composite source */
  row: 0 | 1;
  emotion: string;
  borderClass: string;
  rotation?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onFlip?: (flipped: boolean) => void;
};

export default function FaceCard({
  src,
  col,
  row,
  emotion,
  borderClass,
  rotation = 0,
  width = 170,
  height = 160,
  className,
  style,
  onFlip,
}: FaceCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped((f) => {
      const next = !f;
      onFlip?.(next);
      return next;
    });
  };

  const bgPosX = col === 0 ? "0%" : col === 1 ? "50%" : "100%";
  const bgPosY = row === 0 ? "0%" : "100%";

  return (
    <button
      type="button"
      aria-label={`Carte émotion : ${emotion}`}
      onClick={handleClick}
      style={{
        width,
        height,
        perspective: 900,
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
      className={cn("relative drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]", className)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <div
          style={{ backfaceVisibility: "hidden" }}
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[34px] border-[1.5px] bg-white/[0.18] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)] backdrop-blur-[6px]",
            borderClass,
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "300% 200%",
              backgroundPosition: `${bgPosX} ${bgPosY}`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-[34px] border-[1.5px] bg-white/[0.2] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)] backdrop-blur-[8px]",
            borderClass,
          )}
        >
          <p className="font-display text-[18px] font-semibold tracking-tight text-white">
            {emotion}
          </p>
        </div>
      </motion.div>
    </button>
  );
}
