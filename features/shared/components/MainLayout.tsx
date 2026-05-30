import { Link, useLocation } from "react-router";
import MobileNav from "./header/MobileNav";
import { useEffect, useState } from "react";
import DesktopNav from "./header/DesktopNav";

export default function MainLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 64);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header
      className={`text-primary-foreground fixed top-0 right-0 left-0 z-20 h-16 px-6 lg:h-20 lg:px-8 ${scrolled ? "bg-primary" : ""} ${isHome ? "" : "bg-primary"}`}
    >
      <div className="mx-auto h-full max-w-[1440px]">
        <div className="flex h-full items-center justify-between">
          <div className="w-fit">
            <Link to="/" className="font-montserrat font-bold">
              The Stars Brand
            </Link>
          </div>
          <MobileNav />
          <DesktopNav />
        </div>
      </div>
    </header>
  );
}
