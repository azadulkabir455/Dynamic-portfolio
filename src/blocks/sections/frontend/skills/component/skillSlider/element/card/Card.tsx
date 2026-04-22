import TagCard from "../tag/Tag";
import { cn } from "@/utilities/helpers/classMerge";
import type { SkillSlideCardProps } from "./type";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";

export default function SliderCard({ slide }: SkillSlideCardProps) {
  return (
    <Container
      className={cn(
        "flex flex-col min-h-[320px]  ",
        "border border-primary/30 p-7",
        "bg-primary/10 rounded-[24px]",
      )}
    >
      <Container className="flex flex-wrap gap-2">
        {slide.tags.map((tag) => (
          <TagCard key={`${slide.id}-${tag.label}`} tag={tag} />
        ))}
      </Container>
      <Container
        as="div"
        className={cn(
          "flex items-center",
          "mt-auto gap-4 pt-5",
        )}
      >
        <Text
          variant="h3"
          className={cn(
            "shrink-0",
            "font-antonio font-bold",
            "text-[42px] leading-[52px] [leading-trim:none]",
            "tracking-normal capitalize",
            "text-primary",
          )}
        >
          {slide.title}
        </Text>
        <Container
          as="span"
          className="h-px min-h-px flex-1 bg-primary"
          aria-hidden
        />
      </Container>
    </Container>
  );
}
