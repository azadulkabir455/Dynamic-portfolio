import {
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import type { LoginFormValues } from "./type";

export async function signInWithEmailPassword(values: LoginFormValues): Promise<void> {
  const auth = getFirebaseAuth();
  await setPersistence(
    auth,
    values.remember ? browserLocalPersistence : browserSessionPersistence,
  );
  await signInWithEmailAndPassword(auth, values.email, values.password);
}

export async function signInWithGoogle(remember: boolean): Promise<void> {
  const auth = getFirebaseAuth();
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence,
  );
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider);
}
