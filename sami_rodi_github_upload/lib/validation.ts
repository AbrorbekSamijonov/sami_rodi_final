import { z } from "zod";

export const CUSTOMER_TYPES = ["Homeowner", "Business", "Installer", "Investor", "Other"] as const;
export const INTERESTS = ["Ordering", "Learning more", "Partnership"] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  customerType: z.enum(CUSTOMER_TYPES, { errorMap: () => ({ message: "Please select a customer type" }) }),
  interest: z.enum(INTERESTS, { errorMap: () => ({ message: "Please choose one" }) }),
  systemSizeKw: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : Number(v)))
    .refine((v) => v === undefined || (Number.isFinite(v) && v > 0 && v < 100000), "Enter a valid size in kW"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  // Honeypot: real users never see or fill this
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
