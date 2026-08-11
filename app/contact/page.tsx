import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { getContactPageContent } from "@/lib/contact";

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <article className="relative bg-white text-black min-h-screen pb-24">
      <div className="relative w-full h-[450px] sm:h-[360px] lg:h-[400px] overflow-hidden bg-white">
        {content.heroImage && <img src={content.heroImage.url} alt={content.heroImage.alt} className="h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-white/55" />
      </div>

      <Container className="-mt-[360px] sm:-mt-[280px] lg:-mt-64 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ContactForm
            title={content.title}
            serviceOptions={content.serviceOptions}
            sectorOptions={content.sectorOptions}
            referralSources={content.referralSources}
            privacyNotice={content.privacyNotice}
          />

          <div data-aos="fade-up" className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-10 lg:gap-12 pt-4">
            {content.studios.map((studio) => (
              <section key={studio.title} className="flex flex-col gap-2">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-black tracking-wide leading-none">{studio.title}</h2>
                <div className="font-sans text-base text-zinc-900 leading-snug flex flex-col gap-1 [&_p]:m-0 [&_p:first-child]:font-semibold [&_p:last-child]:mb-1" dangerouslySetInnerHTML={{ __html: studio.address ?? "" }} />
                {studio.phone && <span className="font-sans text-base font-medium text-black">{studio.phone}</span>}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
