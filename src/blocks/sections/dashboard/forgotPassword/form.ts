import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
});

export const forgotPasswordResolver = zodResolver(forgotPasswordSchema);

export const forgotPasswordDefaultValues: z.infer<typeof forgotPasswordSchema> = {
  email: "",
};
