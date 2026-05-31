import Faq from "./Faq";

export default function GetInTouch() {
  return (
    <section className="mt-24 md:mx-auto md:max-w-xl lg:mx-0 lg:mt-0 lg:max-w-[450px]">
      <h2 className="font-montserrat text-foreground-black text-center text-3xl font-extrabold">
        Get in touch
      </h2>
      <div className="text-foreground-black mt-8 space-y-5">
        <p>
          <span className="text-foreground">Location:</span> Ibadan, Ilorin{" "}
        </p>
        <p>
          <span className="text-foreground">Tel:</span> +2348129559571
        </p>
        <p>
          <span className="text-foreground">Email:</span> adejumobie07@gmail.com
        </p>
      </div>
      <Faq />
    </section>
  );
}
