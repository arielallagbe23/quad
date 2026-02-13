import Image from "next/image";

type BrandLogoProps = {
  alt: string;
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({ alt, priority = false, className = "" }: BrandLogoProps) {
  return (
    <Image
      src="/quadlogo.svg"
      alt={alt}
      width={160}
      height={44}
      priority={priority}
      className={`h-9 w-auto sm:h-10 ${className}`}
    />
  );
}
