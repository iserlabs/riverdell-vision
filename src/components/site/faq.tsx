import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion multiple={false} className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-line">
          <AccordionTrigger className="text-left text-base font-medium text-ink hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[15px] leading-relaxed text-ink-soft">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
