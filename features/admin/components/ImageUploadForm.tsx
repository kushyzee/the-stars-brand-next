"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  uploadSchema,
  type UploadFormValues,
} from "@/features/admin/schemas/upload.schema";
import {
  uploadImage,
  createCategory,
} from "@/features/admin/actions/admin.actions";
import { convertToWebP, formatBytes } from "@/lib/utils/image.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
};

export function ImageUploadForm({ categories }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [conversionInfo, setConversionInfo] = useState<string | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryOption: "none",
      categoryId: "",
      newCategoryName: "",
    },
  });

  const categoryOption = form.watch("categoryOption");

  async function onSubmit(data: UploadFormValues) {
    setIsPending(true);
    setServerError(null);
    setConversionInfo(null);

    // Convert to WebP before upload
    let fileToUpload: File;
    try {
      const result = await convertToWebP(data.file);
      fileToUpload = result.file;

      if (result.wasConverted) {
        setConversionInfo(
          `Image optimised: ${formatBytes(result.originalSize)} → ${formatBytes(result.convertedSize)}`,
        );
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Image processing failed",
      );
      setIsPending(false);
      return;
    }

    // Create new category first if needed
    let resolvedCategoryId: string | undefined;

    if (data.categoryOption === "new" && data.newCategoryName) {
      const result = await createCategory({ name: data.newCategoryName });
      if (result.error) {
        setServerError(result.error);
        setIsPending(false);
        return;
      }
      resolvedCategoryId = result.category?.id;
    } else if (data.categoryOption === "existing") {
      resolvedCategoryId = data.categoryId;
    }

    const result = await uploadImage({
      file: fileToUpload,
      title: data.title,
      description: data.description,
      categoryId: resolvedCategoryId,
    });

    if (result.error) {
      setServerError(result.error);
      setIsPending(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      {conversionInfo && (
        <p className="text-sm text-muted-foreground">{conversionInfo}</p>
      )}

      {/* Image file */}
      <Controller
        name="file"
        control={form.control}
        render={({ field: { onChange, ...field }, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="file">Image</FieldLabel>
            <Input
              {...field}
              id="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              aria-invalid={fieldState.invalid}
              onChange={(e) => onChange(e.target.files?.[0])}
              value={undefined}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Title */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              {...field}
              id="title"
              placeholder="e.g. Ankara Evening Dress"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">
              Description{" "}
              <span className="text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Textarea
              {...field}
              id="description"
              placeholder="Brief description of this piece..."
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Category option selector */}
      <Controller
        name="categoryOption"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <div>
              {[
                { value: "none", label: "No category" },
                { value: "existing", label: "Pick existing" },
                { value: "new", label: "Create new" },
              ].map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </Field>
        )}
      />

      {/* Existing category dropdown */}
      {categoryOption === "existing" && (
        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="categoryId">Select category</FieldLabel>
              <select
                {...field}
                id="categoryId"
                aria-invalid={fieldState.invalid}
              >
                <option value="">Choose a category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      {/* New category name */}
      {categoryOption === "new" && (
        <Controller
          name="newCategoryName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newCategoryName">Category name</FieldLabel>
              <Input
                {...field}
                id="newCategoryName"
                placeholder="e.g. Ankara Styles"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      <div>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/dashboard")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Uploading..." : "Upload image"}
        </Button>
      </div>
    </form>
  );
}
