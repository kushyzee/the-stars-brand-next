import Hero from "@/features/home/components/Hero";
import OurServices from "@/features/home/components/OurServices";
import OurCraftStory from "@/features/home/components/OurCraftStory";
import FeaturedWork from "@/features/home/components/FeaturedWork";
import Testimonial from "@/features/home/components/Testimonial";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <OurServices />
      <OurCraftStory />
      <FeaturedWork />
      <Testimonial />
    </div>
  );
}
