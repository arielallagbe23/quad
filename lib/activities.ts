export type PlaceholderRatio = "16:9" | "4:5" | "1:1";

export type Activity = {
  slug: string;
  pricePerPerson: number;
  galleryRatios: PlaceholderRatio[];
};

export const activities: Activity[] = [
  {
    slug: "coastal-freedom-ride",
    pricePerPerson: 65000,
    galleryRatios: ["16:9", "4:5", "1:1", "16:9", "4:5"]
  },
  {
    slug: "ouidah-heritage-circuit",
    pricePerPerson: 89000,
    galleryRatios: ["16:9", "1:1", "4:5", "16:9", "4:5"]
  },
  {
    slug: "porto-novo-signature-tour",
    pricePerPerson: 98000,
    galleryRatios: ["16:9", "4:5", "1:1", "16:9", "1:1"]
  },
  {
    slug: "sunset-beach-escape",
    pricePerPerson: 52000,
    galleryRatios: ["16:9", "4:5", "1:1", "16:9"]
  },
  {
    slug: "urban-riding-club-session",
    pricePerPerson: 47000,
    galleryRatios: ["16:9", "1:1", "4:5", "16:9"]
  },
  {
    slug: "lagoon-discovery-circuit",
    pricePerPerson: 74000,
    galleryRatios: ["16:9", "4:5", "1:1", "16:9", "4:5"]
  }
];

export function getActivityBySlug(slug: string) {
  return activities.find((activity) => activity.slug === slug);
}
