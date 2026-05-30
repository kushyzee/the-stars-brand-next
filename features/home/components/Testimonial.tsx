"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Amara. N",
    title: "Amazing Work Always",
    content:
      "The finishing on my dress was so neat and professional. You can really tell the work is handmade with care. I got so many compliments!",
  },
  {
    name: "Yinka. O",
    title: "Perfect Fit Every Time",
    content:
      "I have ordered both tailored outfits and crochet pieces, and everything always fits beautifully. The quality is consistent, and the attention to detail is amazing.",
  },
  {
    name: "Sam. A",
    title: "Stylish and Reliable",
    content:
      "She understands exactly what I want and brings it to life every single time. Her designs are modern, clean, and truly stand out.",
  },
];

export default function Testimonial() {
  return (
    <section className="bg-primary relative px-6 py-20 lg:py-32">
      <div className="pattern absolute top-0 left-0 h-full w-full bg-neutral-900"></div>
      <div className="bg-primary/45 lg:bg-primary/65 absolute top-0 left-0 h-full w-full"></div>
      <div className="relative z-10 mx-auto max-w-[580px] md:max-w-[500px]">
        <h2 className="font-playfair text-muted mb-2.5 text-center text-sm italic lg:mb-5 lg:text-base">
          Testimonials
        </h2>
        <div>
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="space-y-4 text-center text-white"
                >
                  <h3 className="font-montserrat text-2xl font-extrabold lg:text-4xl">
                    {testimonial.title}
                  </h3>
                  <p className="font-playfair lg:text-lg">
                    {testimonial.content}
                  </p>
                  <p className="font-playfair lg:text-lg">
                    - {testimonial.name}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="ml-10 hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
