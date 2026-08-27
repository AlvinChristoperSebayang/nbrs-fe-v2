import { RapPage } from "@/components/rap/RapPage";
import { getRapPage } from "@/lib/rap";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getRapPage();
  return createPageMetadata({
    pathname: "/rap",
    title: page.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage ?? page.hero,
  });
}

export default async function ReflectRapPage() {
  return <RapPage page={await getRapPage()} />;
}
