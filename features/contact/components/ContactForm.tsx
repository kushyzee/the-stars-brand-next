"use client";

import {
  formFields,
  formSchema,
  type FormData,
  type FormSchema,
} from "@/lib/utilities";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { sendMessage } from "../action/contact.action";
import { IoIosSend } from "react-icons/io";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      occasion: "",
      message: "",
      access_key: "273db51f-eaba-477c-ad8e-82f7af85a8cd",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);

    try {
      const result = await sendMessage(data);

      if (result.success) {
        toast.success("Message sent successfully");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Message sent failed");
    } finally {
      setLoading(false);
    }
    form.reset();
  };

  return (
    <section className="grow md:mx-auto md:max-w-xl lg:mx-0">
      <h2 className="font-montserrat text-foreground-black text-center text-3xl font-extrabold">
        Send Us a Message
      </h2>
      <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="access_key"
          control={form.control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <div className="space-y-6">
          {formFields.map((fieldItem) => (
            <Controller
              name={fieldItem.name}
              key={fieldItem.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-foreground-black"
                    htmlFor={field.name}
                  >
                    {fieldItem.label}{" "}
                    {fieldItem.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </FieldLabel>
                  <Input
                    {...field}
                    className="text-foreground-black h-10 rounded-none"
                    id={field.name}
                    type={fieldItem.type}
                    aria-invalid={fieldState.invalid}
                    placeholder={fieldItem.placeholder}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
          <Controller
            name="service"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-foreground-black" htmlFor="service">
                  Service <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="select-service"
                    aria-invalid={fieldState.invalid}
                    className="text-foreground-black"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tailoring">Custom Tailoring</SelectItem>
                    <SelectItem value="crochet">Crochet</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-foreground-black"
                  htmlFor={field.name}
                >
                  Message<span className="text-red-500">*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  className="text-foreground-black min-h-36 rounded-none"
                  id="message"
                  aria-invalid={fieldState.invalid}
                  placeholder="Tell us about your project, design ideas, timeline, etc."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button disabled={loading} className="mt-8 w-full">
          {loading ? (
            <>
              <Spinner /> Sending...
            </>
          ) : (
            <>
              <IoIosSend /> Send Message
            </>
          )}
        </Button>
        <p className="text-muted-foreground mt-2.5 text-center text-sm">
          Your information is private and only used to respond to your inquiry
        </p>
      </form>
    </section>
  );
}
