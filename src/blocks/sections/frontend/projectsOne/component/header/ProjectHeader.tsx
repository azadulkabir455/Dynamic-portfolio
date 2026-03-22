import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { getSafeLink } from "@/blocks/elements/3d/AnimatedButton/function";
import { cn } from "@/utilities/helpers/classMerge";
import type { ProjectHeaderProps } from "./type";

export const ProjectHeader = ({
  title,
  description,
  buttonText,
  buttonIcon = "Eye",
  link,
  titleClassName,
  descriptionClassName,
}: ProjectHeaderProps) => {
  const href = getSafeLink(link);

  return (
    <Container
      as="div"
      className={cn(
        "flex w-full gap-8 items-center",
      )}
    >
      <Container
        as="div"
        className={cn("flex min-w-0 flex-1 flex-col basis-[65%]", "gap-4 sm:gap-5")}
      >
        <Text
          variant="h2"
          className={cn(
            "text-primary",
            "text-[100px] font-bold capitalize tracking-wide leading-[100%]",
            titleClassName,
          )}
        >
          {title}
        </Text>
        <Text
          variant="p"
          className={cn(
            "textTextColor",
            "font-open-sans text-base text-xl leading-relaxed",
            "mt-2 ",
            descriptionClassName,
          )}
        >
          {description}
        </Text>
      </Container>

      <Container
        as="div"
        className={cn(
          "flex shrink-0",
          "w-full justify-end basis-[35%]",
        )}
      >
        <AnimatedButton
          text={buttonText}
          link={href}
          icon={buttonIcon}
          iconSize={22}
          iconClassName="text-primary"
          textClassName="text-primary"
          dark
          className={cn(
            "w-full max-w-[280px] sm:w-[240px]",
            "border-primary/30 px-3",
          )}
        />
      </Container>
    </Container>
  );
};

export default ProjectHeader;
