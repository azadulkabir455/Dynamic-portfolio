import type { z } from "zod";
import type { loginSchema } from "./form";

export type LoginFormValues = z.infer<typeof loginSchema>;
