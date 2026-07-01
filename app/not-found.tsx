import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="font-playfair text-4xl text-foreground-black mt-2">
          Page not found
        </h1>
      </div>
      <p className="text-sm text-muted-foreground max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="flex gap-4">
        <Link href="/" className={cn(buttonVariants(), "px-8")}>
          Go home
        </Link>
        <Link
          href="/gallery"
          className={cn(buttonVariants({ variant: "outline" }), "px-8")}
        >
          View gallery
        </Link>
      </div>
    </div>
  );
}
