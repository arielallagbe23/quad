"use client";

import { useState } from "react";
import Image from "next/image";
import type { PlaceholderRatio } from "@/lib/activities";

type ImagePlaceholderProps = {
  ratio?: PlaceholderRatio;
  label: string;
  src?: string;
  className?: string;
  dark?: boolean;
};

const ratioClass: Record<PlaceholderRatio, string> = {
  "16:9": "aspect-[16/9]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square"
};

export default function ImagePlaceholder({
  ratio = "16:9",
  label,
  src,
  className = "",
  dark = false
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;
  const safeSrc = src ?? "";

  return (
    <div
      role="img"
      aria-label={label}
      className={`${showImage ? "" : "placeholder-shimmer"} relative overflow-hidden rounded-3xl border ${ratioClass[ratio]} ${
        dark ? "border-white/20 bg-navy/80" : "border-line bg-white"
      } ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "image-grid opacity-30" : "image-grid opacity-70"}`} />
      <div
        className={`absolute -inset-20 rotate-12 ${
          dark ? "lime-blue-accent opacity-35" : "lime-blue-accent opacity-25"
        }`}
      />
      {showImage ? (
        <Image
          src={safeSrc}
          alt={label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : null}
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
