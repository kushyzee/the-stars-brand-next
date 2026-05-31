import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionBodyProps {
  value: string;
  trigger: string;
  content: string;
}

export default function AccordionBody({
  value,
  trigger,
  content,
}: AccordionBodyProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="cursor-pointer">{trigger}</AccordionTrigger>
      <AccordionContent>
        <p>{content}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
