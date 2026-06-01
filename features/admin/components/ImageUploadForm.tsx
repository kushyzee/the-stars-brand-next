"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
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
import {
  convertToWebP,
  formatBytes,
  getObjectPositionClass,
} from "@/lib/utils/image.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import type { Category } from "@/lib/types";
import { toast } from "sonner";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  categories: Category[];
};

const positionOptions = [
  { value: "top", label: "Top" },
  { value: "center", label: "Center" },
  { value: "bottom", label: "Bottom" },
] as const;

export function ImageUploadForm({ categories }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [conversionInfo, setConversionInfo] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      object_position: "center",
      categoryOption: "none",
      categoryId: "",
      newCategoryName: "",
    },
  });

  const categoryOption = useWatch({
    control: form.control,
    name: "categoryOption",
  });

  const objectPosition = useWatch({
    control: form.control,
    name: "object_position",
  });

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
      object_position: data.object_position,
    });

    if (result.error) {
      setServerError(result.error);
      setIsPending(false);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setIsPending(false);
    toast.success("image uploaded successfully");
    form.reset();
    setPreviewUrl(null);
    setConversionInfo(null);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-card border border-border p-6 flex flex-col gap-6"
    >
      {/* Server error banner */}
      {serverError && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3">
          <p className="text-destructive text-sm font-medium">{serverError}</p>
        </div>
      )}

      {/* Conversion info pill */}
      {conversionInfo && (
        <div className="inline-flex self-start">
          <p className="text-green-600 text-xs bg-green-600/10 px-4 py-2 rounded-full">
            {conversionInfo}
          </p>
        </div>
      )}

      {/* Image file */}
      <Controller
        name="file"
        control={form.control}
        render={({ field: { onChange, ...field }, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="file"
              className="text-foreground-black font-medium text-sm"
            >
              Image
            </FieldLabel>
            <Input
              {...field}
              id="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              aria-invalid={fieldState.invalid}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (previewUrl) URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(URL.createObjectURL(file));
                  onChange(file);
                }
              }}
              value={undefined}
              className="placeholder:text-muted-foreground w-full h-14"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Live preview + position picker */}
      {previewUrl && (
        <div className="flex flex-col gap-2">
          {/* Preview box */}
          <div className="relative h-64 w-full overflow-hidden border border-border mt-2 mb-4">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className={`object-cover ${getObjectPositionClass(objectPosition)}`}
            />
          </div>

          {/* Position radio buttons */}
          <Controller
            name="object_position"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-foreground-black font-medium text-sm">
                  Image position
                </FieldLabel>
                <div className="flex gap-2 flex-wrap">
                  {positionOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => field.onChange(option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        field.value === option.value
                          ? "bg-primary text-primary-foreground border-transparent"
                          : "bg-secondary text-secondary-foreground border-border"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs mt-1">
                  Adjust to prevent subject from being cropped
                </p>
              </Field>
            )}
          />
        </div>
      )}

      {/* Title */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="title"
              className="text-foreground-black font-medium text-sm"
            >
              Title
            </FieldLabel>
            <Input
              {...field}
              id="title"
              placeholder="e.g. Ankara Evening Dress"
              aria-invalid={fieldState.invalid}
              className="placeholder:text-muted-foreground w-full"
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
            <FieldLabel
              htmlFor="description"
              className="text-foreground-black font-medium text-sm"
            >
              Description
              <span className="text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Textarea
              {...field}
              id="description"
              placeholder="Brief description of this piece..."
              aria-invalid={fieldState.invalid}
              className="border-input text-foreground placeholder:text-muted-foreground w-full"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Category option selector; pill toggles */}
      <Controller
        name="categoryOption"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel className="text-foreground-black font-medium text-sm">
              Category
            </FieldLabel>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "none", label: "No category" },
                { value: "existing", label: "Pick existing" },
                { value: "new", label: "Create new" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    field.value === option.value
                      ? "bg-primary text-primary-foreground border-transparent"
                      : "bg-secondary text-secondary-foreground border-border"
                  }`}
                >
                  {option.label}
                </button>
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
              <FieldLabel
                htmlFor="categoryId"
                className="text-foreground-black font-medium text-sm"
              >
                Select category
              </FieldLabel>
              <select
                {...field}
                id="categoryId"
                aria-invalid={fieldState.invalid}
                className="flex h-11 w-full border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <FieldLabel
                htmlFor="newCategoryName"
                className="text-foreground-black font-medium text-sm"
              >
                Category name
              </FieldLabel>
              <Input
                {...field}
                id="newCategoryName"
                placeholder="e.g. Ankara Styles"
                aria-invalid={fieldState.invalid}
                className="border-input text-foreground placeholder:text-muted-foreground w-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/dashboard")}
          disabled={isPending}
          className="flex-1 px-2"
        >
          <ArrowLeft /> Back
        </Button>
        <Button type="submit" disabled={isPending} className="flex-2 px-4">
          {isPending ? (
            <>
              <Spinner /> Uploading...
            </>
          ) : (
            <>
              <UploadCloud /> Upload image
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
