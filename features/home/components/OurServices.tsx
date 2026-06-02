import customTailoring from "@/assets/images/custom-tailoring.webp";
import crochetArtistry from "@/assets/images/crochet-artistry.webp";
import Line from "@/features/shared/components/Line";
import SectionHeader from "@/features/shared/components/SectionHeader";
import ServicesCard from "./ServicesCard";

export default function OurServices() {
  return (
    <section className={`mx-auto mt-24 max-w-[1120px] px-6 md:px-10`}>
      <SectionHeader
        supertitle="Discover"
        title="Our Services"
        subtitle="Crafted with precision, designed with passion"
        textCenter={true}
      />
      <div className="mt-5 flex justify-center">
        <Line isWider={true} />
      </div>
      <div className="mt-9 grid grid-cols-1 gap-10 sm:grid-cols-2 md:items-start md:gap-6 lg:mt-14 lg:gap-20">
        <ServicesCard
          image={customTailoring}
          title="Custom Tailoring"
          content="From traditional Nigerian attire like aso-ebi to modern fashion and corporate wear, we create custom pieces that fit perfectly and reflect your unique style."
        />
        <ServicesCard
          image={crochetArtistry}
          title="Crochet Artistry"
          content="Handcrafted crochet bags, accessories, and home decor pieces. Each item is uniquely made with attention to detail and quality materials."
        />
      </div>
    </section>
  );
}
