import { z } from "zod";

export const CompanyNameSchema = z
  .string()
  .optional();