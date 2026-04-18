import type { z } from "zod";
import type { signupSchema } from "./form";

export type SignupFormValues = z.infer<typeof signupSchema>;
