"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/features/auth/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, MailIcon } from "lucide-react";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().trim().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsPending(true);
    setServerError(null);

    const result = await login(data);

    if (result?.error) {
      setServerError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-[400px] border border-border p-8 md:p-10 bg-card flex flex-col gap-6 shadow-xs">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="font-playfair text-3xl font-bold text-foreground-black">
            Admin Login
          </h1>
          <p className="font-montserrat text-xs text-muted-foreground uppercase tracking-widest mt-1">
            The Stars Brand
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Server-side error */}
          {serverError && (
            <p className="text-destructive text-sm font-montserrat text-center mb-2">
              {serverError}
            </p>
          )}

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 w-full"
              >
                <FieldLabel
                  htmlFor="email"
                  className="font-montserrat text-xs font-semibold uppercase tracking-wider text-foreground-black"
                >
                  Email
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="admin@example.com"
                    className="font-montserrat w-full placeholder:text-muted-foreground "
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="font-montserrat text-xs text-destructive mt-1"
                  />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5 w-full"
              >
                <FieldLabel
                  htmlFor="password"
                  className="font-montserrat text-xs font-semibold uppercase tracking-wider text-foreground-black"
                >
                  Password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    className="font-montserrat w-full placeholder:text-muted-foreground"
                  />
                  <InputGroupAddon align="inline-end">
                    <EyeIcon />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="font-montserrat text-xs text-destructive mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
