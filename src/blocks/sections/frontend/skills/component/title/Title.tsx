"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { SkillsTitleProps } from "./type";

export default function SkillsTitle({
  imageUrl,
  text,
  className,
}: SkillsTitleProps) {
  return (
    <Container
      as="div"
      className={cn(
        "w-full bg-primary",
        "pt-[40px] lg:pt-[60px]",
        className,
      )}
    >
      <Text
        variant="h2"
        className={cn(
          "font-antonio text-[50px] lg:text-[70px] xl:text-[100px] text-center font-extrabold",
          "leading-tight tracking-none",
          "bg-clip-text text-transparent",
          "maxContainer",
          "bg-cover bg-fixed bg-no-repeat bg-center",
        )}
        style={{
          backgroundImage: `linear-gradient(to top, var(--secondary), transparent), url("${imageUrl}")`,
        }}
      >
        {text}
      </Text>
    </Container>
  );
}
