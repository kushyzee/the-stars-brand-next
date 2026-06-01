"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteImage,
  togglePublished,
} from "@/features/admin/actions/admin.actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { GalleryImageWithCategory } from "@/lib/types";
import { getObjectPositionClass, getPublicUrl } from "@/lib/utils/image.utils";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

type Props = {
  images: GalleryImageWithCategory[];
};

type RowAction = {
  id: string;
  type: "delete" | "toggle";
};

export function ImageTable({ images }: Props) {
  const [pendingAction, setPendingAction] = useState<RowAction | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    setPendingAction({ id, type: "delete" });
    const result = await deleteImage(id);

    if (result?.error) {
      console.error(result.error);
      setPendingAction(null);
      return;
    }

    router.refresh();
    setPendingAction(null);
  }

  async function handleToggle(id: string, currentValue: boolean) {
    setPendingAction({ id, type: "toggle" });
    const result = await togglePublished(id, currentValue);

    if (result?.error) {
      console.error(result.error);
      setPendingAction(null);
      return;
    }
    router.refresh();
    setPendingAction(null);
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card border border-border gap-4">
        <p className="text-muted-foreground text-sm">No images uploaded yet.</p>
        <Link href="/admin/dashboard/upload">
          <Button>
            <UploadCloud /> Upload your first image
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border divide-y divide-border font-montserrat overflow-hidden">
      {images.map((image: GalleryImageWithCategory) => {
        const isActing = pendingAction?.id === image.id;

        return (
          <div key={image.id} className="flex gap-4 p-4 items-start">
            {/* Thumbnail */}
            <div className="shrink-0 relative w-20 h-20 overflow-hidden">
              <Image
                src={getPublicUrl(image.storage_path)}
                alt={image.title}
                fill
                className={cn(
                  "object-cover ",
                  getObjectPositionClass(image.object_position),
                )}
              />
            </div>

            {/* Info and action stacked on the right */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {/* Info Stack */}
              <div>
                <p className="text-foreground-black font-semibold truncate text-base">
                  {image.title}
                </p>
                <p className="text-muted-foreground text-sm">
                  {image.categories?.name ?? "Uncategorized"}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {new Date(image.created_at).toLocaleDateString("en-NG")}
                </p>
              </div>

              {/* Published status toggle badge */}
              <div className="flex">
                <button
                  onClick={() => handleToggle(image.id, image.is_published)}
                  disabled={isActing}
                  aria-label={image.is_published ? "Unpublish" : "Publish"}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-opacity ${
                    isActing ? "opacity-50" : "hover:opacity-85"
                  } ${
                    image.is_published
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground border border-border"
                  }`}
                >
                  {image.is_published ? "Published" : "Draft"}
                </button>
              </div>

              {/* Edit + Delete buttons */}
              <div className="flex gap-2 mt-1">
                <Link
                  href={`/admin/dashboard/edit/${image.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isActing}
                    className="w-full text-xs h-8"
                  >
                    Edit
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isActing}
                      className="flex-1 text-xs h-8"
                    >
                      {isActing && pendingAction?.type === "delete"
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete image?</AlertDialogTitle>
                      <AlertDialogDescription>
                        &quot;{image.title}&quot; will be permanently deleted
                        from your gallery and storage. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => handleDelete(image.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
