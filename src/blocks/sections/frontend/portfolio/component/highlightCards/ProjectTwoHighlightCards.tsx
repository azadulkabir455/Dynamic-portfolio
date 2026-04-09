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
            "relative flex min-h-[140px] min-w-0 flex-col items-center justify-center gap-3 rounded-2xl px-2 py-6 sm:min-h-[176px] sm:gap-4 sm:px-4 sm:py-9",
            "border-2 border-secondary bg-transparent",
            "text-center transition-opacity duration-200 hover:opacity-90",
          )}
        >
          <Icon
            name={item.icon}
            size={32}
            className="shrink-0 text-secondary"
            strokeWidth={1.65}
          />
          <Text
            variant="span"
            className={cn(
              "font-open-sans text-sm font-semibold uppercase tracking-[0.12em] text-secondary",
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
