import Link from "next/link";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="text-xl font-medium text-black hover:underline dark:text-zinc-50"
      >
        {post.title}
      </Link>
      <p className="mt-1 text-sm text-zinc-500">{post.publishedAt}</p>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
    </li>
  );
}
