import type { PlaceholderRatio } from "@/lib/activities";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type GalleryItem = {
  label: string;
  ratio: PlaceholderRatio;
  src?: string;
};

type GalleryProps = {
  items: GalleryItem[];
};

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item, index) => (
        <ImagePlaceholder
          key={`${item.label}-${index}`}
          ratio={item.ratio}
          label={item.label}
          src={item.src}
          className={index % 5 === 0 ? "col-span-2" : ""}
        />
      ))}
    </div>
  );
}
