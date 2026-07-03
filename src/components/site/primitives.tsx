import { cn } from "@/lib/utils";

export function Container({
  className,
  wide = false,
  children,
}: {
  className?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        wide ? "max-w-7xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  id,
  children,
}: {
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28", id && "scroll-mt-24", className)}
    >
      {children}
    </section>
  );
}

// Ruled editorial label: the mono uppercase eyebrow followed (or flanked, when
// centered) by a hairline rule, so section labels read as indexed markers. The
// rules are decorative (aria-hidden).
export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <span
      className={cn(
        "flex w-full items-center gap-3.5",
        align === "center" && "justify-center",
        className,
      )}
    >
      {align === "center" && <span aria-hidden className="h-px flex-1 bg-line" />}
      <span className="eyebrow shrink-0 text-clay">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  titleAs: TitleTag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow align={align} className="max-w-2xl">
          {eyebrow}
        </Eyebrow>
      )}
      <TitleTag className="max-w-2xl text-balance text-3xl font-medium leading-[1.08] md:text-[2.6rem]">
        {title}
      </TitleTag>
      {lead && (
        <p
          className={cn(
            "max-w-[34rem] text-lg leading-[1.55] text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
