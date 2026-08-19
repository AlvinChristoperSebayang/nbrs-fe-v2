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
    <section className="bg-white text-black ">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-heading text-[40px] uppercase leading-none">Our heritage services</h2>
          {intro && (
            <div
              className="mt-5 text-sm leading-relaxed text-zinc-800 sm:text-base [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-rose-600 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: intro }}
            />
          )}
        </div>

        <div className="mt-12 space-y-10 lg:mt-16">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="max-w-md font-heading uppercase leading-none text-[40px]">{group.title}</h3>
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
