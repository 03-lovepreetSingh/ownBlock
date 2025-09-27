import { z } from "zod";

// User profile validation schema
export const userProfileSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: "Please enter a valid phone number"
    }),
  
  address: z.string()
    .optional()
    .refine((val) => !val || val.length <= 500, {
      message: "Address must be less than 500 characters"
    }),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;