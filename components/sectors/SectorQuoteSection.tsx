import { QuoteSection } from "@/components/ui/QuoteSection";
import type { ImageSource } from "@/lib/types";

export function SectorQuoteSection({
  image,
  quote,
  author,
  role,
  quoteIconColor = "#FFDAC6",
}: {
  image: ImageSource;
  quote: string;
  author: string;
  role?: string;
  quoteIconColor?: string;
}) {
  return (
    <QuoteSection
      image={image}
      quote={quote}
      author={author}
      role={role}
      quoteIconColor={quoteIconColor}
    />
  );
}
