import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

export const loginResolver = zodResolver(loginSchema);

export const loginDefaultValues: z.infer<typeof loginSchema> = {
  email: "",
  password: "",
  remember: true,
};
