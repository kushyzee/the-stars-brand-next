import Link from "next/link";
import { UploadCloud } from "lucide-react";

export function FloatingUploadButton() {
  return (
    <Link
      href="/admin/dashboard/upload"
      aria-label="Upload new image"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
    >
      <UploadCloud className="h-5 w-5" />
    </Link>
  );
}
