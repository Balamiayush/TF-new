import { z } from "zod";

export const PhoneSchema = z
  .string("Invalid phone number")
  .min(1, "Phone number is required");