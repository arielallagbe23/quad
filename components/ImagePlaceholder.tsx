import type { PlaceholderRatio } from "@/lib/activities";

type ImagePlaceholderProps = {
  ratio?: PlaceholderRatio;
  label: string;
  className?: string;
  dark?: boolean;
};

const ratioClass: Record<PlaceholderRatio, string> = {
  "16:9": "aspect-[16/9]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square"
};

export default function ImagePlaceholder({ ratio = "16:9", label, className = "", dark = false }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`placeholder-shimmer relative overflow-hidden rounded-3xl border ${ratioClass[ratio]} ${
        dark ? "border-white/20 bg-navy/80" : "border-line bg-white"
      } ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "image-grid opacity-30" : "image-grid opacity-70"}`} />
      <div
        className={`absolute -inset-20 rotate-12 ${
          dark ? "lime-blue-accent opacity-35" : "lime-blue-accent opacity-25"
        }`}
      />
      <span
        className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${
          dark ? "bg-white/12 text-white" : "bg-navy/10 text-navy"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
