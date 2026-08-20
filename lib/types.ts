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

export type NewsItem = {
  title: string;
  href?: string;
  image?: ImageSource;
  description?: string;
};

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
