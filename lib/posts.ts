import type { Post } from "./types";

const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    excerpt: "Our very first post.",
    content: "This is the content of our first post.",
    publishedAt: "2026-01-10",
  },
  {
    slug: "second-post",
    title: "Second Post",
    excerpt: "A follow-up post.",
    content: "This is the content of the second post.",
    publishedAt: "2026-02-15",
  },
];

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((post) => post.slug === slug);
}
