"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";
import PageTitle from "@/components/PageTitle";
import MapButton from "@/components/MapButton";
import QuestCard from "@/components/QuestCard";
import MirokaiSchematic from "@/components/MirokaiSchematic";

const QUESTS = [
  {
    id: "humans",
    title: "Comprendre les humains",
    subtitle: "Le Mirokaï découvre et apprend",
    bg: "/images/quest-humans.jpg",
    locked: false,
    href: "/chapitre-1",
  },
  {
    id: "deplacement",
    title: "Le premier déplacement",
    subtitle: "Trouve le bon chemin",
    bg: "/images/quest-deplacement.jpg",
    locked: true,
  },
  {
    id: "parole",
    title: "La parole et l’écoute",
    subtitle: "Le Mirokaï apprend",
    bg: "/images/quest-parole.jpg",
    locked: true,
  },
  {
    id: "mission",
    title: "La mission sur terre",
    subtitle: "Le Mirokaï prend forme",
    bg: "/images/quest-mission.jpg",
    locked: true,
  },
] as const;

const PIECES_TOTAL = 4;
const PIECES_COLLECTED = 0;

export default function QuestsPage() {
  const router = useRouter();
  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <StarfieldBackground />

      <header className="safe-top relative z-20 flex items-start justify-between px-5 pt-6">
        <PageTitle top="VOTRE" bottom="QUÊTE" />
        <MapButton className="mt-1" />
      </header>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 mt-5 px-4"
      >
        <article className="relative overflow-hidden rounded-3xl border border-[color:var(--rose-20)] bg-card p-4 backdrop-blur-md">
          <div className="flex gap-3">
            <div className="flex-shrink-0 overflow-hidden rounded-xl">
              <div className="relative h-[62px] w-[46px]">
                <Image
                  src="/images/miroka-avatar.png"
                  alt="Miroka"
                  fill
                  sizes="46px"
                  className="drag-none object-cover"
                  style={{ objectPosition: "30% 20%" }}
                />
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1 pr-1">
              <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-violet-50">
                Miroka
              </p>
              <p className="text-[14.5px] leading-[1.4] text-violet-10">
                À chaque étape, tu découvriras mon histoire et tu gagneras une
                pièce pour me reconstruire. Quand toutes les pièces seront
                réunies, nous pourrons enfin nous rencontrer.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-3 h-[220px] w-full max-w-[320px]">
            <MirokaiSchematic className="h-full" />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: PIECES_TOTAL }).map((_, i) => (
              <span
                key={i}
                className={`h-[5px] w-[32px] rounded-full ${
                  i < PIECES_COLLECTED
                    ? "bg-violet-10"
                    : "bg-[#797979]"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[14px] text-violet-10">
            {PIECES_COLLECTED}/{PIECES_TOTAL} pièces collectées
          </p>
        </article>
      </motion.section>

      <section className="relative z-20 mt-5 flex flex-col gap-3 px-4 pb-10 safe-bottom">
        {QUESTS.map((q, i) => (
          <QuestCard
            key={q.id}
            title={q.title}
            subtitle={q.subtitle}
            bgSrc={q.bg}
            locked={q.locked}
            delay={0.2 + i * 0.08}
            onClick={
              "href" in q && q.href ? () => router.push(q.href) : undefined
            }
          />
        ))}
      </section>
    </main>
  );
}
