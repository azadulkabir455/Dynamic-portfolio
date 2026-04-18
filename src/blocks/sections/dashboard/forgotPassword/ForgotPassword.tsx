"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Text from "@/blocks/elements/text/Text";
import Button from "@/blocks/elements/button/Button";
import Link from "@/blocks/elements/link/Link";
import Container from "@/blocks/elements/container/Container";
import FormContainer from "@/blocks/elements/form/formContainer/FormContainer";
import Input from "@/blocks/elements/form/input/Input";
import {
  forgotPasswordDefaultValues,
  forgotPasswordResolver,
} from "./form";
import type { ForgotPasswordFormValues } from "./type";
import { sendPasswordReset } from "./function";
import { mapFirebaseAuthError } from "@/utilities/auth/mapFirebaseAuthError";

export default function ForgotPassword() {
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: forgotPasswordResolver,
    defaultValues: forgotPasswordDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setBannerError(null);
    setSent(false);
    try {
      await sendPasswordReset(values);
      setSent(true);
    } catch (e) {
      setBannerError(mapFirebaseAuthError(e));
    }
  };

  return (
    <Container className="w-full max-w-md rounded-xl border border-ternary/15 bg-white/95 p-8 backdrop-blur-sm">
      <Container className="border-b border-ternary/15 pb-4">
        <Text variant="h1" className="font-antonio text-2xl font-bold capitalize text-ternary">
          Reset password
        </Text>
        <Text variant="p" className="mt-1 text-sm text-text">
          Enter your account email. We will send a reset link if the account exists.
        </Text>
      </Container>

      {bannerError ? (
        <Text variant="p" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {bannerError}
        </Text>
      ) : null}

      {sent ? (
        <Text variant="p" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Check your inbox for a password reset email.
        </Text>
      ) : null}

      <FormContainer form={form} onSubmit={onSubmit} className="mt-5 space-y-4">
        <Input<ForgotPasswordFormValues>
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          leftIcon="Mail"
          inputClassName="shadow-none"
        />
        <Button
          type="submit"
          size="lg"
          className="w-full border border-primary bg-primary text-secondary hover:opacity-95"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Send reset link
        </Button>
      </FormContainer>

      <Text variant="p" className="mt-6 text-center text-sm text-text">
        <Link href="/admin/login" className="font-medium text-primary">
          Back to sign in
        </Link>
      </Text>
    </Container>
  );
}
