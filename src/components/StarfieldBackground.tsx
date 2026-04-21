import Image from "next/image";

export default function StarfieldBackground({
  withGlow = false,
}: {
  withGlow?: boolean;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-ink-gradient" />
      <Image
        src="/images/stars.png"
        alt=""
        fill
        priority
        sizes="440px"
        className="drag-none object-cover opacity-50 mix-blend-screen"
      />
      {withGlow && (
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_at_50%_90%,rgba(162,51,125,0.35),transparent_70%)]" />
      )}
    </div>
  );
}
