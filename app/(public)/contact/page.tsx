import contact from "@/assets/images/contact.jpg";
import ContactForm from "@/features/contact/components/ContactForm";
import GetInTouch from "@/features/contact/components/GetInTouch";
import PageHeader from "@/features/shared/components/PageHeader";

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
