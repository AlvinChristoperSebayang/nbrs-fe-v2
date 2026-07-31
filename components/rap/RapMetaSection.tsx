import { Container } from "@/components/ui/Container";

export function RapMetaSection({
  title,
  publicationDate,
  author,
  endorsedBy,
  readTime,
}: {
  title: string;
  publicationDate: string;
  author: string;
  endorsedBy: string;
  readTime: string;
}) {
  return (
    <section className="relative bg-white lg:-mt-[70px] lg:bg-transparent">
      <Container>
        <div className="bg-[#EDEDED] px-6 py-6 sm:px-10 sm:py-8">
          <h2 className="text-lg text-black sm:text-xl">{title}</h2>
          <div className="mt-4 h-px w-full bg-black/20" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-bold text-black">Publication Date:</p>
              <p className="mt-1 text-sm text-black">{publicationDate}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-black">Author:</p>
              <p className="mt-1 text-sm text-black">{author}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-black">Endorsed by:</p>
              <p className="mt-1 text-sm text-black">{endorsedBy}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-black">Read time:</p>
              <p className="mt-1 text-sm text-black">{readTime}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
