"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";

type CharId = "miroka" | "miroki";

const STORIES: Record<CharId, { name: string; hero: string; text: string }> = {
  miroka: {
    name: "Miroka",
    hero: "/images/miroka-avatar.png",
    text: "Sur la planète Nimira, vivent les Mirokaï, des êtres qui utilisent une énergie magique appelée Mirium, née des rêves, de l’imagination et de la créativité. Cette énergie maintient la paix et l’harmonie sur leur monde.",
  },
  miroki: {
    name: "Miroki",
    hero: "/images/miroka-avatar.png",
    text: "Sur la planète Nimira, vivent les Mirokaï, des êtres qui utilisent une énergie magique appelée Mirium, née des rêves, de l’imagination et de la créativité. Cette énergie maintient la paix et l’harmonie sur leur monde.",
  },
};

function StoryContent() {
  const router = useRouter();
  const params = useSearchParams();
  const charParam = (params.get("mirokai") as CharId | null) ?? "miroka";
  const char = STORIES[charParam] ?? STORIES.miroka;

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-between px-5 pt-6">
        <PageTitle top="L’HISTOIRE" bottom="DES MIROKAÏ" />
        <button
          type="button"
          aria-label="Ouvrir la carte"
          className="relative mt-1 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border-2 border-[color:var(--rose-20)] text-text-primary transition active:scale-95"
        >
          <span
            aria-hidden
            className="absolute -top-[13px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[9.5px] border-b-[12px] border-x-transparent border-b-[color:var(--rose-20)]"
          />
          <span
            aria-hidden
            className="absolute -top-[10px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-ink-start"
          />
          <MapIcon />
        </button>
      </header>

      <section className="relative z-20 mt-6 px-4">
        <article className="flex gap-3 rounded-3xl border border-[color:var(--rose-20)] bg-card p-4 backdrop-blur-md">
          <div className="flex-shrink-0 overflow-hidden rounded-xl">
            <div className="relative h-[62px] w-[46px]">
              <Image
                src={char.hero}
                alt={char.name}
                fill
                sizes="46px"
                className="drag-none object-cover"
                style={{ objectPosition: "30% 20%" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 pr-1">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-violet-50">
              {char.name}
            </p>
            <p className="text-[15px] leading-[1.38] text-violet-10">{char.text}</p>
          </div>
        </article>
      </section>

      <section className="relative z-20 mt-6 flex justify-center">
        <PrimaryButton onClick={() => router.push("/welcome")}>
          Commencer l’aventure
        </PrimaryButton>
      </section>

      <div className="relative z-10 mt-auto h-[46vh] w-full overflow-hidden">
        <div className="absolute -left-[10%] bottom-0 h-full w-[90%]">
          <Image
            src={char.hero}
            alt=""
            fill
            priority
            sizes="440px"
            className="drag-none pointer-events-none select-none object-contain object-bottom"
          />
        </div>
      </div>
    </main>
  );
}

export default function StoryPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-[100svh] w-full bg-ink-gradient" />
      }
    >
      <StoryContent />
    </Suspense>
  );
}

function MapIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M4 8l8-3 8 3 8-3v19l-8 3-8-3-8 3V8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 5v19M20 8v19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
