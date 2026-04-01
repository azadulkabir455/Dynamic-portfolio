import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { ProjectTwoHighlightItem } from "./type";

type ProjectTwoHighlightCardsProps = {
  items: ProjectTwoHighlightItem[];
  className?: string;
};

const ProjectTwoHighlightCards = ({
  items,
  className,
}: ProjectTwoHighlightCardsProps) => {
  return (
    <Container
      as="div"
      className={cn(
        "mt-8 grid w-full grid-cols-3 gap-2 sm:mt-10 sm:gap-3 md:gap-4",
        className,
      )}
    >
      {items.map((item, i) => (
        <Container
          key={`${item.label}-${i}`}
          as="div"
          className={cn(
            "relative isolate flex min-h-[140px] min-w-0 flex-col items-center justify-center gap-3 rounded-xl px-2 py-6 sm:min-h-[176px] sm:gap-4 sm:px-4 sm:py-9",
            "border border-white/35",
            "bg-gradient-to-br from-white/30 via-white/12 to-white/[0.06]",
            "backdrop-blur-[14px] backdrop-saturate-150",
            "shadow-none",
            "text-center",
          )}
        >
          <Icon
            name={item.icon}
            size={32}
            className="shrink-0 text-primary"
            strokeWidth={1.65}
          />
          <Text
            variant="span"
            className={cn(
              "font-open-sans text-sm font-semibold uppercase tracking-[0.12em] text-primary",
              "sm:text-base sm:tracking-[0.16em] md:text-lg",
            )}
          >
            {item.label}
          </Text>
        </Container>
      ))}
    </Container>
  );
};

export default ProjectTwoHighlightCards;
