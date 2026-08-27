import { RapPage } from "@/components/rap/RapPage";
import { getRapNewsPage } from "@/lib/rap";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getRapNewsPage();
  return createPageMetadata({
    pathname: "/news/reflect-reconciliation-action-plan",
    title: page.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage ?? page.hero,
  });
}

/** Legacy route deliberately stays on its original News entry until editorial removal. */
export default async function LegacyReflectRapNewsPage() {
  return <RapPage page={await getRapNewsPage()} />;
}
