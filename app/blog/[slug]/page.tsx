import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  return { title: post?.title ?? "Not Found" };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container className="py-16">
      <article>
        <PageHeader title={post.title} />
        <p className="-mt-6 mb-8 text-sm text-zinc-500">{post.publishedAt}</p>
        <div>{post.content}</div>
      </article>
    </Container>
  );
}
