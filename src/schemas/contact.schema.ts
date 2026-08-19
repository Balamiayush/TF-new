import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  workEmail: z.string().email("Invalid work email address"),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  referralSource: z.string().min(1, "Referral source is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;