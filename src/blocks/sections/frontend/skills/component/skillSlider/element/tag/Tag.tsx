import { cn } from "@/utilities/helpers/classMerge";
import type { SkillTagProps } from "./type";
import Container from "@/blocks/elements/container/Container";

export default function TagCard({ tag }: SkillTagProps) {
  const { label } = tag;

  return (
    <Container
      as="span"
      className={cn(
        "inline-flex items-center align-middle rounded-full border border-secondary/30",
        "bg-secondary px-3 py-1.5 backdrop-blur-sm",
        "font-open-sans font-bold",
        "text-[16px] leading-[24px] [leading-trim:none]",
        "tracking-normal text-ternary-light",
      )}
    >
      {label}
    </Container>
  );
}
