import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import type { SignupFormValues } from "./type";

export async function registerWithEmailPassword(values: SignupFormValues): Promise<void> {
  const auth = getFirebaseAuth();
  const { user } = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );
  const displayName = values.name.trim();
  if (displayName) {
    await updateProfile(user, { displayName });
  }
}
