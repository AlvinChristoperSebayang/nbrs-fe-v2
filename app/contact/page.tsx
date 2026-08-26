import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { getContactPageContent } from "@/lib/contact";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getContactPageContent();
  return createPageMetadata({ pathname: "/contact", title: page.title, cmsTitle: page.cmsSeoTitle, description: page.seoDescription, image: page.seoImage ?? page.heroImage, imageAlt: page.title });
}

function formatStudioAddress(addressHtml: string | null): string {
  if (!addressHtml) return "";

  const paragraphs = addressHtml
    .split(/<\/p>/i)
    .map((p) => p.replace(/<p[^>]*>/i, "").trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return addressHtml;
  }

  const country = paragraphs[0];
  const rawAddress = paragraphs.slice(1).join("<br />");

  const lines = rawAddress
    .split(/<br\s*\/?>|\n/i)
    .map((l) => l.trim())
    .filter(Boolean);

  let formattedAddressLines: string[] = [];

  if (lines.length === 3) {
    const [line1, line2, line3] = lines;
    if (/^(suite|level|unit|floor|lot|apt|building)\b/i.test(line1)) {
      formattedAddressLines = [`${line1}, ${line2}`, line3];
    } else {
      formattedAddressLines = [line1, `${line2} ${line3}`];
    }
  } else if (lines.length > 3) {
    formattedAddressLines = [
      lines.slice(0, 2).join(", "),
      lines.slice(2).join(" "),
    ];
  } else {
    formattedAddressLines = lines;
  }

  return `<p>${country}</p><p>${formattedAddressLines.join("<br />")}</p>`;
}

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <article className="relative bg-white text-black min-h-screen pb-24">
      <div className="relative w-full h-[450px] sm:h-[360px] lg:h-[400px] overflow-hidden bg-white">
        {content.heroImage && (
          <img
            src={content.heroImage.url}
            alt={content.heroImage.alt || "Contact Us"}
            title={content.heroImage.alt || "Contact Us"}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <Container className="-mt-[360px] sm:-mt-[280px] lg:-mt-68 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ContactForm
            title={content.title}
            serviceOptions={content.serviceOptions}
            sectorOptions={content.sectorOptions}
            referralSources={content.referralSources}
            privacyNotice={content.privacyNotice}
          />

          <div data-aos="fade-up" className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-10 lg:gap-18 pt-4">
            {content.studios.map((studio) => (
              <section key={studio.title} className="flex flex-col gap-2">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-black tracking-wide leading-none">{studio.title}</h2>
                <div className="font-sans text-base text-zinc-900 leading-snug flex flex-col gap-1 [&_p]:m-0 [&_p:first-child]:font-semibold [&_p:last-child]:mb-1" dangerouslySetInnerHTML={{ __html: formatStudioAddress(studio.address) }} />
                {studio.phone && <span className="font-sans text-base font-medium text-black">{studio.phone}</span>}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
