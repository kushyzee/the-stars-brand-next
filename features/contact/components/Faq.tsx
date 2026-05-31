import { Accordion } from "@/components/ui/accordion";
import AccordionBody from "./AccordionBody";

export default function Faq() {
  return (
    <div className="mt-20">
      <h3 className="font-montserrat text-foreground-black text-center text-3xl font-extrabold">
        Frequently Asked Questions
      </h3>
      <div className="mt-8">
        <Accordion
          type="single"
          collapsible
          defaultValue="item1"
          className="border-border space-y-4 border px-4"
        >
          <AccordionBody
            value="item1"
            trigger="How long does a custom order take?"
            content="Typically 2-4 weeks depending on complexity and current orders."
          />
          <AccordionBody
            value="item2"
            trigger="Do you source fabrics or should I provide my own?"
            content="We can source quality fabrics for you, or you're welcome to provide your own materials."
          />
          <AccordionBody
            value="item3"
            trigger="How do I get a quote?"
            content="Contact us via WhatsApp or use this form with your project details. We'll provide a quote within 24 hours."
          />
          <AccordionBody
            value="item4"
            trigger="Can I see samples of your work?"
            content="Check our Gallery page or request specific samples via WhatsApp."
          />
        </Accordion>
      </div>
    </div>
  );
}
