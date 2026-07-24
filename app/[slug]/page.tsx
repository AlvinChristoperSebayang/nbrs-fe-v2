import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getPages } from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = await getPageBySlug(slug);

  return { title: page?.title ?? "Not Found" };
}

export default async function TemplatePage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  return (
    <Container className="py-16">
      <PageHeader title={page.title} description={page.description} />
      <div>{page.content}</div>
    </Container>
  );
}
