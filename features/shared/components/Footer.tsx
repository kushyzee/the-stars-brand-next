import { buttonVariants } from "@/components/ui/button";
import { menu, whatsappUrl } from "@/lib/utilities";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary px-6 pt-24 pb-6 md:px-10">
      <div
        className={`text-background mx-auto max-w-[1120px] gap-8 md:flex md:justify-between`}
      >
        <div className="shrink md:max-w-[402px]">
          <h2 className="font-montserrat text-lg font-bold">
            Ready to Create Something Beautiful?
          </h2>
          <p className="mt-3 mb-6">
            Get in touch with us to discuss your custom tailoring or crochet
            project
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-14 shrink-0 md:mt-0 md:max-w-40">
          <h2 className="font-montserrat mb-5 text-lg font-bold">
            SOCIAL MEDIA
          </h2>
          <ul className="space-y-1.5">
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@thestarsbrand"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thestarsbrand"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-14 shrink-0 md:mt-0">
          <h2 className="font-montserrat mb-5 text-lg font-bold">CONTACT</h2>
          <ul className="space-y-1.5">
            <li>
              <a
                href="tel:08129559571"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                08129559571
              </a>
            </li>
            <li>
              <a
                href="mailto:adejumobie07@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                adejumobie07@gmail.com
              </a>
            </li>
            <li>Ibadan, Ilorin, Nationwide</li>
          </ul>
        </div>
      </div>
      <div className={`text-background mx-auto max-w-[1440px]`}>
        <div className="font-montserrat mt-24 border-t border-neutral-800 pt-10 md:flex md:items-center md:justify-between">
          <h3 className="text-center text-lg font-bold">The Stars Brand</h3>
          <ul className="mt-8 flex flex-col items-center gap-4 md:mt-0 md:flex-row md:items-center md:gap-6 lg:gap-8">
            {menu.map((item) => (
              <li key={item.name}>
                <Link href={item.path} className="text-sm">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="font-playfair mt-10 text-center text-sm italic">
          &copy; {new Date().getFullYear()} The Stars Brand. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
