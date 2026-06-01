import * as z from "zod";

const phoneNumber = "2348129559571";
const message = "Hello, I would like to know more about your services";
export const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

export interface MenuItem {
  name: string;
  path: string;
}

export const menu: MenuItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().trim().min(1, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  occasion: z.string(),
  message: z.string().trim().min(1, "Message is required"),
  access_key: z.string(),
});

export type FormSchema = FormData & {
  access_key?: string;
};

export type FormData = z.infer<typeof formSchema>;

interface FormFields {
  name: keyof FormData;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

export const formFields: FormFields[] = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Your name",
    required: true,
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Your email",
    required: true,
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Your phone",
    required: true,
    type: "tel",
  },
  {
    name: "occasion",
    label: "Occasion (optional)",
    placeholder: "e.g., Wedding, Casual, Corporate event",
    required: false,
    type: "text",
  },
];
