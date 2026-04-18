import type { z } from "zod";
import type { heroFormSchema } from "./form";

export type HeroFormValues = z.infer<typeof heroFormSchema>;
