import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import type { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Privacy Policy | NBRS Architecture",
  description: "Learn about NBRS Architecture's commitment to protecting your personal data and privacy.",
};

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "HAVE QUESTIONS ABOUT YOUR PRIVACY?",
  description: "Reach out to our privacy officer or leadership team for any data protection inquiries.",
  buttonText: "CONTACT NBRS",
  buttonHref: "/contact",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/about-hero.png"
        title="PRIVACY POLICY"
        description="Our commitment to protecting your personal information and privacy."
      />

      {/* 2. CONTENT SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Left Sticky Sidebar (Desktop) */}
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
              <h2 className="font-heading text-3xl lg:text-[40px] uppercase font-bold leading-none text-black border-b-4 border-black pb-4">
                Privacy Policy
              </h2>
              <p className="font-sans text-sm text-zinc-500 mt-4">
                Last updated: August 2026
              </p>
            </div>

            {/* Right Content Area */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="lg:col-span-8 flex flex-col gap-8 font-sans text-base text-zinc-800 leading-relaxed"
            >
              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  1. Introduction & Overview
                </h3>
                <p>
                  NBRS Architecture (&ldquo;NBRS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to safeguarding the privacy and personal data of visitors to our website, clients, partners, and job applicants. This Privacy Policy outlines how we collect, use, disclose, and store your personal information in accordance with applicable privacy laws and regulations.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  2. Collection of Personal Information
                </h3>
                <p>
                  We collect personal information that you voluntarily provide to us when contacting us via our website forms, subscribing to updates, applying for employment, or engaging with our architectural design and research services. Information collected may include:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-zinc-700">
                  <li>Full name, job title, and professional organisation details.</li>
                  <li>Contact details including email address, phone number, and mailing address.</li>
                  <li>Resume, portfolio, and employment history for career applications.</li>
                  <li>Technical data such as IP address, browser type, and device information gathered via website cookies.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  3. Use of Personal Information
                </h3>
                <p>
                  Your personal information is collected and processed strictly for legitimate business operations, including:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-zinc-700">
                  <li>Responding to inquiries and managing client service requests.</li>
                  <li>Evaluating career applications and conducting recruitment processes.</li>
                  <li>Delivering industry insights, news, and project updates when requested.</li>
                  <li>Improving our website performance, user experience, and digital security.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  4. Disclosure & Data Sharing
                </h3>
                <p>
                  NBRS does not sell, rent, or trade your personal information to third parties. We may disclose your information to trusted third-party service providers who assist us in operating our website, managing IT infrastructure, or conducting business operations, strictly under binding confidentiality agreements.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  5. Data Storage & Security
                </h3>
                <p>
                  We employ robust technical and organizational security measures to protect your personal data from unauthorized access, misuse, loss, or alteration. All electronic records are stored securely on encrypted servers with restricted access permissions.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  6. Your Rights & Access
                </h3>
                <p>
                  You have the right to request access to the personal information we hold about you, request corrections to inaccurate data, or request the deletion of your personal records, subject to legal retention obligations.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  7. Contacting Our Privacy Team
                </h3>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is managed, please contact NBRS Architecture via email at <span className="font-semibold text-black">privacy@nbrs.com.au</span> or through our contact page.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CTA SECTION */}
      <CtaSection content={cta} />
    </article>
  );
}
