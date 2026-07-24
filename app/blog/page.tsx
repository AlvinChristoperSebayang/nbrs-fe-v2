import { getPosts } from "@/lib/posts";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/blog/PostCard";

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <Container className="py-16">
      <PageHeader title="Blog" />
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </Container>
  );
}
