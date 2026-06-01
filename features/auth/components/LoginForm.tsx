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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MailIcon } from "lucide-react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().trim().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          <h1 className="font-playfair italic text-3xl font-bold text-foreground-black">
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
                    className="w-full placeholder:text-muted-foreground "
                  />
                  <InputGroupAddon>
                    <MailIcon className="size-[18px]" />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className=" text-xs text-destructive mt-1"
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    className="w-full placeholder:text-muted-foreground"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <LuEye className="size-[18px]" />
                      ) : (
                        <LuEyeClosed className="size-[18px]" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-destructive mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? (
              <>
                <Spinner /> Signing in...{" "}
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
