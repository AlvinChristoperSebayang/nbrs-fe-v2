import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/blog/PostCard";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
};

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "GET IN TOUCH",
  description: "Want to contribute or learn more about our publications? Reach out to our design team.",
  buttonText: "CONTACT US",
  buttonHref: "/contact",
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/hero2.png"
        title="OUR BLOG"
        description="Thought leadership, articles, and design insights from the NBRS collective."
      />

      {/* 2. BLOG POSTS LIST SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <h2 data-aos="fade-up" className="font-heading text-3xl font-bold uppercase tracking-wide">
              ARTICLES & ESSAYS
            </h2>
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <div key={post.slug} data-aos="fade-up">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CTA SECTION */}
      <CtaSection content={cta} />
    </article>
  );
}
