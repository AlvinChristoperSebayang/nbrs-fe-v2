export type TemplatePage = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export type ResponsiveImageDimensions = Partial<
  Record<"mobile" | "tablet" | "desktop", ImageDimensions>
>;

export type ResponsiveImage = {
  mobile: string;
  tablet: string;
  desktop: string;
  /** Intrinsic dimensions of each Craft crop, when its transform is known. */
  dimensions?: ResponsiveImageDimensions;
};

export type ImageSource = string | ResponsiveImage;

export type Sector = {
  label: string;
  image: ImageSource;
  href: string;
  description: string;
  hoverColor: string;
};

/** An item rendered by GridEffect with optional viewport-specific imagery. */
export type GridEffectItem = {
  title: string;
  href?: string;
  image?: ImageSource;
  mobileImage?: ImageSource;
  desktopImage?: ImageSource;
  description?: string;
};

/** @deprecated Use GridEffectItem for new GridEffect data sources. */
export type NewsItem = GridEffectItem;

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: ImageSource;
  sector?: string;
  completedAt?: string;
};

export type CtaContent = {
  image: ImageSource;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
};
