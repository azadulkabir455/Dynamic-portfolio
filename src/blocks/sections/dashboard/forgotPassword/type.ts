import type { z } from "zod";
import type { forgotPasswordSchema } from "./form";

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
