"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";
import PrimaryButton from "@/components/PrimaryButton";
import { cn } from "@/lib/cn";

type CharId = "miroka" | "miroki";

const CHARACTERS: Record<
  CharId,
  {
    id: CharId;
    name: string;
    tagline: string;
    image: string;
    logo: string;
    side: "left" | "right";
  }
> = {
  miroka: {
    id: "miroka",
    name: "Miroka",
    tagline: "Curieuse et pleine d’énergie.",
    image: "/images/miroka.png",
    logo: "/images/logo-miroka.png",
    side: "left",
  },
  miroki: {
    id: "miroki",
    name: "Miroki",
    tagline: "Malin et toujours prêt à aider.",
    image: "/images/miroki.png",
    logo: "/images/logo-miroki.png",
    side: "right",
  },
};

const ORDER: CharId[] = ["miroka", "miroki"];

export default function ChoosePage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const current = CHARACTERS[ORDER[index]];
  const isLeft = current.side === "left";

  const go = (delta: 1 | -1) => {
    setDir(delta);
    setIndex((prev) => (prev + delta + ORDER.length) % ORDER.length);
  };

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      <div className="safe-top relative z-20 pt-[64px] pl-5">
        <h1 className="font-display text-[48px] font-black leading-[0.95] tracking-[-0.02em] text-text-primary">
          CHOISIS TON
        </h1>
        <h1 className="text-outline font-display text-[48px] font-black leading-[0.95] tracking-[-0.02em]">
          MIROKAÏ
        </h1>
      </div>

      <section className="relative z-10 mt-4 flex-1">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={current.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -300) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 300) go(-1);
            }}
            className="absolute inset-0"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-[-20%] top-[35%] h-[60%] w-[120%]"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(120,170,230,0.30), rgba(80,130,210,0.10) 55%, transparent 78%)",
              }}
            />

            <div
              className={cn(
                "absolute top-0 h-full w-[72%]",
                isLeft ? "left-[-14px]" : "right-[-14px]",
              )}
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="440px"
                priority
                className="drag-none select-none object-contain object-bottom"
              />
            </div>

            <div
              className={cn(
                "absolute bottom-[34%] flex w-auto flex-col gap-0",
                isLeft
                  ? "right-[22px] items-end text-right"
                  : "left-[22px] items-start text-left",
              )}
            >
              <Image
                src={current.logo}
                alt={current.name}
                width={220}
                height={78}
                className="drag-none h-[56px] w-auto"
                priority
              />
              <p className="mt-1 text-[15px] leading-tight text-text-primary">
                {current.tagline}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label={isLeft ? "Voir Miroki" : "Voir Miroka"}
          onClick={() => go(isLeft ? 1 : -1)}
          className={cn(
            "absolute top-[48%] z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-text-primary/60 transition hover:text-text-primary active:scale-90",
            isLeft ? "right-[6px]" : "left-[6px]",
          )}
        >
          <Chevron direction={isLeft ? "right" : "left"} />
        </button>
      </section>

      <footer className="safe-bottom relative z-10 flex flex-col items-center pb-8 pt-3">
        <PrimaryButton onClick={() => router.push(`/story?mirokai=${current.id}`)}>
          Suivant
        </PrimaryButton>
      </footer>
    </main>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="32"
      height="40"
      viewBox="0 0 24 40"
      fill="none"
      aria-hidden
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path
        d="M7 5l12 15-12 15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
