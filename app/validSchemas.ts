import { z } from "zod";

export const validateIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "description is required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "description is required")
    .max(65535)
    .optional(),
  assignedUserId: z
    .string()
    .min(1, "AssignedUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
