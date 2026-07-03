import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="-mx-2 -my-3 pt-8 text-sm text-ink-soft md:mx-0 md:my-0"
    >
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={it.name}>
            {it.href && !last ? (
              <Link
                href={it.href}
                className="inline-flex items-center px-2 py-3 hover:text-teal md:px-0 md:py-0"
              >
                {it.name}
              </Link>
            ) : (
              <span className="text-ink" aria-current={last ? "page" : undefined}>
                {it.name}
              </span>
            )}
            {!last && <span className="px-2 text-clay">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
