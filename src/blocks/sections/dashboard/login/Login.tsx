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
import Checkbox from "@/blocks/elements/form/checkbox/Checkbox";
import { loginDefaultValues, loginResolver } from "./form";
import type { LoginFormValues } from "./type";
import { signInWithEmailPassword, signInWithGoogle } from "./function";
import { mapFirebaseAuthError } from "@/utilities/auth/mapFirebaseAuthError";

export default function Login() {
  const router = useRouter();
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: loginResolver,
    defaultValues: loginDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setBannerError(null);
    try {
      await signInWithEmailPassword(values);
      router.replace("/admin");
    } catch (e) {
      setBannerError(mapFirebaseAuthError(e));
    }
  };

  const handleGoogle = async () => {
    setBannerError(null);
    setGoogleLoading(true);
    try {
      const remember = form.getValues("remember");
      await signInWithGoogle(remember);
      router.replace("/admin");
    } catch (e) {
      setBannerError(mapFirebaseAuthError(e));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Container className="w-full max-w-md rounded-xl border border-ternary/15 bg-white/95 p-8 backdrop-blur-sm">
      <Container className="border-b border-ternary/15 pb-4">
        <Text variant="h1" className="font-antonio text-2xl font-bold capitalize text-ternary">
          Admin sign in
        </Text>
        <Text variant="p" className="mt-1 text-sm text-text">
          Use your email or Google account.
        </Text>
      </Container>

      {bannerError ? (
        <Text variant="p" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {bannerError}
        </Text>
      ) : null}

      <FormContainer form={form} onSubmit={onSubmit} className="mt-5 space-y-4">
        <Input<LoginFormValues>
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          leftIcon="Mail"
          inputClassName="shadow-none"
        />
        <PasswordInput<LoginFormValues>
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          leftIcon="Lock"
          inputClassName="shadow-none"
        />
        <Container className="flex flex-wrap items-center justify-between gap-2">
          <Checkbox<LoginFormValues> name="remember" label="Remember me" />
          <Link href="/admin/forgotPassword" variant="muted" className="text-sm text-ternary">
            Forgot password?
          </Link>
        </Container>
        <Button
          type="submit"
          size="lg"
          className="w-full border border-primary bg-primary text-secondary hover:opacity-95"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Sign in
        </Button>
      </FormContainer>

      <Container className="relative my-6">
        <Container className="absolute inset-0 flex items-center" aria-hidden>
          <Container as="span" className="block w-full border-t border-slate-200" />
        </Container>
        <Container className="relative flex justify-center text-xs uppercase tracking-wide">
          <Container as="span" className="bg-white/95 px-2 text-slate-500">
            Or continue with
          </Container>
        </Container>
      </Container>

      <Button
        type="button"
        size="lg"
        className="w-full border border-ternary/20 bg-white text-ternary hover:bg-secondary/40"
        leftIcon="Chrome"
        loading={googleLoading}
        disabled={googleLoading || form.formState.isSubmitting}
        onClick={handleGoogle}
      >
        Google
      </Button>

      <Text variant="p" className="mt-6 text-center text-sm text-text">
        No account?{" "}
        <Link href="/admin/signup" className="font-medium text-primary">
          Create one
        </Link>
      </Text>
    </Container>
  );
}
