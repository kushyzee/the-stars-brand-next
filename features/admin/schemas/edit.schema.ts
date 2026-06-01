import { z } from "zod";

export const editSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().max(500, "Description is too long").optional(),
    object_position: z.enum(["top", "center", "bottom"]),
    categoryOption: z.enum(["existing", "new", "none"]),
    categoryId: z.string().optional(),
    newCategoryName: z.string().max(50, "Category name is too long").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.categoryOption === "existing" && !data.categoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a category",
        path: ["categoryId"],
      });
    }
    if (data.categoryOption === "new" && !data.newCategoryName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a category name",
        path: ["newCategoryName"],
      });
    }
  });

export type EditFormValues = z.infer<typeof editSchema>;
