import { QuoteSection } from "@/components/ui/QuoteSection";
import type { ImageSource } from "@/lib/types";

export function SectorQuoteSection({
  image,
  quote,
  author,
  role,
  quoteIconColor = "#FFDAC6",
  quoteTextClassName,
  imageClassName,
  imageContainerClassName,
}: {
  image: ImageSource;
  quote: string;
  author: string;
  role?: string;
  quoteIconColor?: string;
  quoteTextClassName?: string;
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
      quoteTextClassName={quoteTextClassName}
      imageClassName={`object-top ${imageClassName ?? ""}`}
      imageContainerClassName={imageContainerClassName}
    />
  );
}
