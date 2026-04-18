import { sendPasswordResetEmail } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import type { ForgotPasswordFormValues } from "./type";

export async function sendPasswordReset(values: ForgotPasswordFormValues): Promise<void> {
  const auth = getFirebaseAuth();
  await sendPasswordResetEmail(auth, values.email);
}
