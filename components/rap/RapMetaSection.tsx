export function RapMetaSection({
  title,
  publicationDate,
  author,
  endorsedBy,
  readTime,
  isMobileUncontainer = false,
}: {
  title: string;
  publicationDate: string;
  author: string;
  endorsedBy: string;
  readTime: string;
  isMobileUncontainer?: boolean;
}) {
  if (isMobileUncontainer) {
    return (
      <section className="w-full bg-[#EDEDED] px-6 py-6 sm:px-8">
        <h2 className="font-sans text-base font-semibold text-black sm:text-lg">
          {title}
        </h2>
        <div className="mt-3 h-px w-full bg-black/50" />
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-black sm:text-sm">
              Publication Date:
            </p>
            <p className="mt-1 text-xs text-black/90 sm:text-sm">
              {publicationDate}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-black sm:text-sm">Author:</p>
            <p className="mt-1 text-xs text-black/90 sm:text-sm">{author}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-black sm:text-sm">Endorsed by:</p>
            <p className="mt-1 text-xs text-black/90 sm:text-sm">{endorsedBy}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-black sm:text-sm">Read time:</p>
            <p className="mt-1 text-xs text-black/90 sm:text-sm">{readTime}</p>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Floating Container Card
  return (
    <div className="w-full bg-[#EDEDED] px-10 py-8 shadow-sm">
      <h2 className="font-sans text-lg font-semibold text-black">
        {title}
      </h2>
      <div className="mt-3 h-px w-full bg-black/50" />
      <div className="mt-5 grid grid-cols-4 gap-6">
        <div>
          <p className="text-sm font-bold text-black">
            Publication Date:
          </p>
          <p className="mt-1 text-sm text-black/90">
            {publicationDate}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-black">Author:</p>
          <p className="mt-1 text-sm text-black/90">{author}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-black">Endorsed by:</p>
          <p className="mt-1 text-sm text-black/90">{endorsedBy}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-black">Read time:</p>
          <p className="mt-1 text-sm text-black/90">{readTime}</p>
        </div>
      </div>
    </div>
  );
}
