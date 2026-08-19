import { z } from "zod";
import { EmailSchema } from "./email.schema";
import { PhoneSchema } from "./phone.schema";
import { CompanyNameSchema } from "./companyname.schema";
import { FullNameSchema } from "./fulllname.schema";

export const demoSchema = z.object({
  name: FullNameSchema,
  workEmail: EmailSchema,
  phoneNumber: PhoneSchema,
  companyName: CompanyNameSchema,
  industry: z.string().min(1, "Please select an industry"),
  message: z.string().min(1, "Please enter a message or context for the call"),
});

export type DemoFormData = z.infer<typeof demoSchema>;