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

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow text-clay", className)}>{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="max-w-2xl text-balance text-3xl font-medium leading-[1.08] md:text-[2.6rem]">
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
