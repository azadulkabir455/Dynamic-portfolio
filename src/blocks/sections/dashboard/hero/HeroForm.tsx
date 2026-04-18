"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Text from "@/blocks/elements/text/Text";
import Container from "@/blocks/elements/container/Container";
import FormContainer from "@/blocks/elements/form/formContainer/FormContainer";
import Input from "@/blocks/elements/form/input/Input";
import Textarea from "@/blocks/elements/form/textarea/Textarea";
import ImageUploader from "@/blocks/elements/form/imageUploader/ImageUploader";
import { LucideIconPicker } from "@/blocks/elements/form/lucideIconPicker/LucideIconPicker";
import { heroFormDefaultValues, heroFormResolver } from "./form";
import type { HeroFormValues } from "./type";
import { getHeroFormInitialValues, HERO_FORM_SAVE_DEBOUNCE_MS, persistHeroFormValues } from "./function";
import { cn } from "@/utilities/helpers/classMerge";
import { heroFieldIcon, heroFieldInput, heroFieldLabel, heroFieldTextarea } from "./heroFieldStyles";

export default function HeroForm() {
  const form = useForm<HeroFormValues>({
    resolver: heroFormResolver,
    defaultValues: heroFormDefaultValues,
    mode: "onChange",
  });

  const inCls = heroFieldInput();
  const taCls = heroFieldTextarea();
  const labCls = heroFieldLabel();
  const icCls = heroFieldIcon();

  useEffect(() => {
    form.reset(getHeroFormInitialValues());
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const sub = form.watch(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        persistHeroFormValues(form.getValues());
      }, HERO_FORM_SAVE_DEBOUNCE_MS);
    });
    return () => {
      sub.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [form]);

  return (
    <Container className="w-full min-w-0">
      <Text variant="h2" className="font-sans text-lg font-bold text-ternary">
        Edit hero content
      </Text>
      <Text variant="p" className="mt-1 font-sans text-xs text-text">
        Changes save in this browser and update the preview and the public site hero.
      </Text>

      <FormContainer form={form} onSubmit={() => {}} className="mt-6 space-y-4">
        <Container className="flex w-full min-w-0 flex-col gap-4">
          <ImageUploader<HeroFormValues>
            name="imageSrc"
            label="Hero image"
            labelClassName={labCls}
            helperText="Saved with the rest of this form in your browser."
            dropzoneClassName={cn(
              "min-h-[152px] rounded border border-dashed border-black bg-transparent py-8 text-ternary",
              "hover:bg-black/[0.04] focus-within:ring-1 focus-within:ring-black/25 focus-within:ring-offset-0",
              "[&_svg]:text-black",
            )}
            previewClassName="rounded border border-black bg-transparent p-2"
            confirmRemoveMessage="Remove this image? You can upload another one right after."
          />
          <Input<HeroFormValues>
            name="imageAlt"
            label="Image alt"
            labelClassName={labCls}
            inputClassName={inCls}
          />
        </Container>

        <Container className="flex w-full min-w-0 flex-col gap-4">
          <Input<HeroFormValues>
            name="name"
            label="Name"
            leftIcon="User"
            labelClassName={labCls}
            iconClassName={icCls}
            inputClassName={inCls}
          />
          <Input<HeroFormValues>
            name="designation"
            label="Designation"
            leftIcon="Briefcase"
            labelClassName={labCls}
            iconClassName={icCls}
            inputClassName={inCls}
          />
          <Input<HeroFormValues>
            name="experience"
            label="Experience (e.g. 7+)"
            leftIcon="Clock"
            labelClassName={labCls}
            iconClassName={icCls}
            inputClassName={inCls}
          />
        </Container>
        <Textarea<HeroFormValues>
          name="introText"
          label="Intro text"
          rows={3}
          labelClassName={labCls}
          inputClassName={taCls}
        />
        <Container className="flex w-full min-w-0 flex-col gap-4">
          <Input<HeroFormValues>
            name="ctaLabel"
            label="CTA label"
            leftIcon="Tag"
            labelClassName={labCls}
            iconClassName={icCls}
            inputClassName={inCls}
          />
          <Input<HeroFormValues>
            name="ctaURL"
            label="CTA URL"
            leftIcon="Link"
            labelClassName={labCls}
            iconClassName={icCls}
            inputClassName={inCls}
          />
        </Container>
        <Textarea<HeroFormValues>
          name="aboutMe"
          label="About me"
          rows={4}
          labelClassName={labCls}
          inputClassName={taCls}
        />

        <Text variant="h3" className="pt-1 font-sans text-base font-bold text-ternary">
          Social links
        </Text>
        <Container className="flex w-full min-w-0 flex-col gap-4">
          {([0, 1, 2] as const).map((i) => (
            <Container key={i} className="flex min-w-0 flex-col gap-3 rounded border border-black/20 bg-transparent p-3">
              <Text variant="span" className="font-sans text-xs font-bold uppercase tracking-wide text-ternary">
                Link {i + 1}
              </Text>
              <LucideIconPicker<HeroFormValues>
                name={`socialLinks.${i}.iconName`}
                label="Icon name"
                labelClassName={labCls}
                inputClassName={inCls}
                helperText="Type to filter Lucide icons."
              />
              <Input<HeroFormValues>
                name={`socialLinks.${i}.label`}
                label="Icon label"
                labelClassName={labCls}
                inputClassName={inCls}
              />
              <Input<HeroFormValues>
                name={`socialLinks.${i}.link`}
                label="Icon URL"
                labelClassName={labCls}
                inputClassName={inCls}
              />
            </Container>
          ))}
        </Container>
      </FormContainer>
    </Container>
  );
}
