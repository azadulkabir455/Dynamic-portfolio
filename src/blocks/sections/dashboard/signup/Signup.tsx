"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Text from "@/blocks/elements/text/Text";
import Button from "@/blocks/elements/button/Button";
import Link from "@/blocks/elements/link/Link";
import Container from "@/blocks/elements/container/Container";
import FormContainer from "@/blocks/elements/form/formContainer/FormContainer";
import Input from "@/blocks/elements/form/input/Input";
import PasswordInput from "@/blocks/elements/form/password-input/PasswordInput";
import { signupDefaultValues, signupResolver } from "./form";
import type { SignupFormValues } from "./type";
import { registerWithEmailPassword } from "./function";
import { mapFirebaseAuthError } from "@/utilities/auth/mapFirebaseAuthError";

export default function Signup() {
  const router = useRouter();
  const [bannerError, setBannerError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: signupResolver,
    defaultValues: signupDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: SignupFormValues) => {
    setBannerError(null);
    try {
      await registerWithEmailPassword(values);
      router.replace("/admin");
    } catch (e) {
      setBannerError(mapFirebaseAuthError(e));
    }
  };

  return (
    <Container className="w-full max-w-md rounded-xl border border-ternary/15 bg-white/95 p-8 backdrop-blur-sm">
      <Container className="border-b border-ternary/15 pb-4">
        <Text variant="h1" className="font-antonio text-2xl font-bold capitalize text-ternary">
          Create admin account
        </Text>
        <Text variant="p" className="mt-1 text-sm text-text">
          Sign up with your name and email.
        </Text>
      </Container>

      {bannerError ? (
        <Text variant="p" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {bannerError}
        </Text>
      ) : null}

      <FormContainer form={form} onSubmit={onSubmit} className="mt-5 space-y-4">
        <Input<SignupFormValues>
          name="name"
          label="Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          leftIcon="User"
          inputClassName="shadow-none"
        />
        <Input<SignupFormValues>
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          leftIcon="Mail"
          inputClassName="shadow-none"
        />
        <PasswordInput<SignupFormValues>
          name="password"
          label="Password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          leftIcon="Lock"
          inputClassName="shadow-none"
        />
        <PasswordInput<SignupFormValues>
          name="confirmPassword"
          label="Confirm password"
          placeholder="Repeat password"
          autoComplete="new-password"
          leftIcon="Lock"
          inputClassName="shadow-none"
        />
        <Button
          type="submit"
          size="lg"
          className="w-full border border-primary bg-primary text-secondary hover:opacity-95"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Sign up
        </Button>
      </FormContainer>

      <Text variant="p" className="mt-6 text-center text-sm text-text">
        Already have an account?{" "}
        <Link href="/admin/login" className="font-medium text-primary">
          Sign in
        </Link>
      </Text>
    </Container>
  );
}
