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

export type Sector = {
  label: string;
  image: string;
  href: string;
  description: string;
  hoverColor: string;
};

export type NewsItem = {
  title: string;
  href?: string;
  image?: string;
  description?: string;
};

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  sector?: string;
  completedAt?: string;
};

export type CtaContent = {
  image: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};
