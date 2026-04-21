import { cn } from "@/lib/cn";

export default function MapButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Ouvrir la carte"
      onClick={onClick}
      className={cn(
        "relative flex h-[54px] w-[54px] items-center justify-center rounded-2xl border-2 border-[color:var(--rose-20)] text-text-primary transition active:scale-95",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-[13px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[9.5px] border-b-[12px] border-x-transparent border-b-[color:var(--rose-20)]"
      />
      <span
        aria-hidden
        className="absolute -top-[10px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-ink-start"
      />
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M4 8l8-3 8 3 8-3v19l-8 3-8-3-8 3V8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 5v19M20 8v19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
