import OurMission from "@/features/about/components/OurMission";
import OurStory from "@/features/about/components/OurStory";
import WhyChooseUs from "@/features/about/components/WhyChooseUs";
import PageHeader from "@/features/shared/components/PageHeader";
import aboutUs from "@/assets/images/about.jpg";

export const metadata = {
  title: "About",
  description:
    "Learn about The Stars Brand: a Nigerian fashion label born from a passion for creating custom pieces that tell your story.",
  alternates: { canonical: "https://thestarbrand.vercel.app/about" },
};
export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="ABOUT US"
        subtitle="Crafting dreams into reality, one stitch at a time"
        image={aboutUs}
      />
      <OurStory />
      <WhyChooseUs />
      <OurMission />
    </div>
  );
}
