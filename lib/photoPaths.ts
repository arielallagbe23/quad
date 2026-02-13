import type { PlaceholderRatio } from "@/lib/activities";

const ratioToken: Record<PlaceholderRatio, string> = {
  "16:9": "16x9",
  "4:5": "4x5",
  "1:1": "1x1"
};

export const homePhotoPaths = {
  heroMain: "/images/home/hero-main-4x5.webp",
  premiumExperience: "/images/home/premium-experience-16x9.webp",
  circuits: {
    one: "/images/home/circuit-cotonou-ouidah-4x5.webp",
    two: "/images/home/circuit-cotonou-porto-novo-4x5.webp",
    three: "/images/home/circuit-jak-district-4x5.webp",
    four: "/images/home/circuit-sunset-beach-loop-4x5.webp"
  },
  club: {
    one: "/images/home/club-lifestyle-01-4x5.webp",
    two: "/images/home/club-lifestyle-02-4x5.webp",
    three: "/images/home/club-lifestyle-03-16x9.webp"
  },
  gallery: [
    "/images/home/gallery-01-16x9.webp",
    "/images/home/gallery-02-4x5.webp",
    "/images/home/gallery-03-1x1.webp",
    "/images/home/gallery-04-16x9.webp",
    "/images/home/gallery-05-4x5.webp",
    "/images/home/gallery-06-1x1.webp",
    "/images/home/gallery-07-16x9.webp",
    "/images/home/gallery-08-4x5.webp"
  ]
} as const;

export const activityCommonPhotoPaths = {
  detailLifestyle: "/images/activities/common/detail-lifestyle-1x1.webp",
  detailRoute: "/images/activities/common/detail-route-1x1.webp"
} as const;

export function getActivityCardPhotoPath(slug: string) {
  return `/images/activities/${slug}/card-16x9.webp`;
}

export function getActivityHeroPhotoPath(slug: string) {
  return `/images/activities/${slug}/hero-16x9.webp`;
}

export function getActivityGalleryPhotoPath(slug: string, index: number, ratio: PlaceholderRatio) {
  const order = String(index + 1).padStart(2, "0");
  return `/images/activities/${slug}/gallery-${order}-${ratioToken[ratio]}.webp`;
}
