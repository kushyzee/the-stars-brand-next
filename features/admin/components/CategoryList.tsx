"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  deleteCategory,
  updateCategory,
} from "@/features/admin/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { Category } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";

type Props = {
  categories: Category[];
};

const renameSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

type RenameValues = z.infer<typeof renameSchema>;

function CategoryRow({ category }: { category: Category }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RenameValues>({
    resolver: zodResolver(renameSchema),
    mode: "onBlur",
    defaultValues: { name: category.name },
  });

  async function onRename(data: RenameValues) {
    if (data.name === category.name) {
      setIsEditing(false);
      return;
    }

    setIsPending(true);
    setServerError(null);

    const result = await updateCategory(category.id, { name: data.name });

    if (result.error) {
      setServerError(result.error);
      setIsPending(false);
      return;
    }

    toast.success("Category updated successfully");
    router.refresh();
    setIsEditing(false);
    setIsPending(false);
  }

  async function onDelete() {
    setIsPending(true);
    const result = await deleteCategory(category.id);
    if (result.error) {
      toast.error(result.error);
      setIsPending(false);
      return;
    }
    toast.success("Category deleted successfully");
    router.refresh();
  }

  return (
    <div className="border-b border-border py-4 last:border-0">
      {isEditing ? (
        <form
          onSubmit={form.handleSubmit(onRename)}
          className="flex flex-col sm:flex-row gap-3 w-full items-start sm:items-center"
        >
          <div className="flex-1 w-full">
            {serverError && (
              <p className="text-destructive text-sm mb-2">{serverError}</p>
            )}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoFocus
                    disabled={isPending}
                    className="w-full"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="flex-1 sm:flex-none"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => {
                setIsEditing(false);
                setServerError(null);
                form.reset();
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-montserrat font-medium text-foreground-black">
              {category.name}
            </p>
            <p className="font-montserrat text-xs text-muted-foreground">
              {category.slug}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              disabled={isPending}
            >
              Rename
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isPending}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete &quot;{category.name}&quot;?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This category will be removed. Images assigned to it will
                    become uncategorized, they won&apos;t be deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} variant="destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
}

export function CategoryList({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-montserrat text-muted-foreground text-sm">
          No categories yet. Create one when uploading an image.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </div>
  );
}
