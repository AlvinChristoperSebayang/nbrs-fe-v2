import { QuoteSection } from "@/components/ui/QuoteSection";
import type { ImageSource } from "@/lib/types";

export function SectorQuoteSection({
  image,
  quote,
  author,
  role,
  quoteIconColor = "#FFDAC6",
  imageClassName,
  imageContainerClassName,
}: {
  image: ImageSource;
  quote: string;
  author: string;
  role?: string;
  quoteIconColor?: string;
  imageClassName?: string;
  imageContainerClassName?: string;
}) {
  return (
    <QuoteSection
      image={image}
      quote={quote}
      author={author}
      role={role}
      quoteIconColor={quoteIconColor}
      imageClassName={`object-top ${imageClassName ?? ""}`}
      imageContainerClassName={imageContainerClassName}
    />
  );
}
