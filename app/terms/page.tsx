import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import type { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Terms & Conditions | NBRS Architecture",
  description: "Terms of use and conditions governing your access to NBRS Architecture website and services.",
};

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "LOOKING TO PARTNER OR COLLABORATE?",
  description: "Let's discuss your next project or architectural inquiry with our team.",
  buttonText: "CONTACT NBRS",
  buttonHref: "/contact",
};

export default function TermsAndConditionsPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/hero2.png"
        title="TERMS & CONDITIONS"
        description="Terms of use governing your access to NBRS Architecture website and services."
      />

      {/* 2. CONTENT SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Left Sticky Sidebar (Desktop) */}
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
              <h2 className="font-heading text-3xl lg:text-[40px] uppercase font-bold leading-none text-black border-b-4 border-black pb-4">
                Terms of Use
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
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing or using the website of NBRS Architecture (&ldquo;NBRS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please refrain from using our website and services.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  2. Intellectual Property Rights
                </h3>
                <p>
                  All content on this website—including architectural designs, project photographs, text, graphics, logos, research publications, and code—is the property of NBRS Architecture or its licensors and is protected by international copyright and intellectual property laws.
                </p>
                <p className="mt-3">
                  You may not reproduce, modify, distribute, publish, or commercialize any content from this website without prior explicit written permission from NBRS.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  3. Permitted Use of Website
                </h3>
                <p>
                  You are granted a limited, non-exclusive license to view and download materials from this website solely for personal, non-commercial informational purposes, provided that all copyright and proprietary notices remain intact.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  4. Disclaimer of Warranties
                </h3>
                <p>
                  The information provided on this website is for general informational purposes only. While NBRS endeavors to maintain accurate and up-to-date content, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website content.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  5. Limitation of Liability
                </h3>
                <p>
                  To the fullest extent permitted by law, NBRS Architecture shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website or any materials contained herein.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  6. Third-Party Links & Services
                </h3>
                <p>
                  This website may contain links to external third-party websites or services. NBRS has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  7. Governing Law & Jurisdiction
                </h3>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-black uppercase mb-3">
                  8. Modifications to Terms
                </h3>
                <p>
                  NBRS reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website following any changes constitutes your acceptance of the revised terms.
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
