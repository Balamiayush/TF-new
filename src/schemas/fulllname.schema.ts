import { z } from "zod";

export const FullNameSchema = z
  .string("Invalid full name ")
  .min(1, "FullName is required");