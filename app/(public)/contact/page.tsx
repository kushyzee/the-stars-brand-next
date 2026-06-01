import contact from "@/assets/images/contact.jpg";
import ContactForm from "@/features/contact/components/ContactForm";
import GetInTouch from "@/features/contact/components/GetInTouch";
import PageHeader from "@/features/shared/components/PageHeader";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with The Stars Brand. Reach us on WhatsApp at 08129559571 or email adejumobie07@gmail.com to discuss your custom order.",
  alternates: { canonical: "https://thestarbrand.vercel.app/contact" },
};

export default function Contact() {
  return (
    <div>
      <PageHeader
        title="CONTACT US"
        subtitle="Let's bring your vision to life"
        image={contact}
      />
      <div className={`mx-auto max-w-[1120px] px-0 pb-28`}>
        <div className="w-full justify-between gap-16 px-6 lg:flex lg:px-10">
          <ContactForm />
          <GetInTouch />
        </div>
      </div>
    </div>
  );
}
