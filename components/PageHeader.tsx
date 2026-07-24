export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </header>
  );
}
