import { Container } from "@/components/ui/Container";

type ServiceGroup = { title: string; items: string[]; accent?: boolean };

export function HeritageServicesSection({
  intro,
  advisoryServices,
  conservationServices,
}: {
  intro: string;
  advisoryServices: string[];
  conservationServices: string[];
}) {
  const groups: ServiceGroup[] = [
    { title: "Heritage advisory services", items: advisoryServices, accent: true },
    { title: "Heritage conservation and architectural services", items: conservationServices },
  ].filter((group) => group.items.length);

  if (!groups.length) return null;

  return (
    <section className="bg-white py-16 text-black lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-heading text-3xl uppercase leading-none sm:text-4xl">Our heritage services</h2>
          {intro && <p className="mt-5 text-sm leading-relaxed text-zinc-800 sm:text-base">{intro}</p>}
        </div>

        <div className="mt-12 space-y-10 lg:mt-16">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="max-w-md font-heading text-2xl uppercase leading-none sm:text-3xl">{group.title}</h3>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className={`min-h-14 px-4 py-3 text-sm font-medium leading-snug ${group.accent ? "bg-[#f2d5ce]" : "bg-[#eeeeee]"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
