import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email"),
    password: z.string().min(6, "Use at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signupResolver = zodResolver(signupSchema);

export const signupDefaultValues: z.infer<typeof signupSchema> = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
