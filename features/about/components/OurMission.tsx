import Line from "@/features/shared/components/Line";

export default function OurMission() {
  return (
    <section className="bg-primary relative px-6 py-20 lg:py-32">
      <div className="pattern absolute top-0 left-0 h-full w-full bg-neutral-900"></div>
      <div className="bg-primary/45 lg:bg-primary/65 absolute top-0 left-0 h-full w-full"></div>
      <div className="relative z-10 mx-auto max-w-[580px] text-center text-white">
        <h2 className="font-montserrat text-2xl font-extrabold lg:text-3xl">
          Our Mission
        </h2>
        <div className="mt-4 mb-6 flex justify-center">
          <Line isWider={true} isWhite={true} />
        </div>
        <p className="lg:text-lg">
          To preserve and elevate the art of craftsmanship by creating
          exceptional custom pieces that celebrate individuality, honor
          tradition, and inspire confidence. We are committed to delivering
          unmatched quality and personalized service to every client.
        </p>
      </div>
    </section>
  );
}
