import { z } from "zod";

export const updateDomainSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);

export const addDomainSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    color: z.string().min(1),
});