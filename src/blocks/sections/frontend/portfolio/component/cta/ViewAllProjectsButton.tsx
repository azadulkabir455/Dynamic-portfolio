"use client";

import Container from "@/blocks/elements/container/Container";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";
import type { ViewAllProjectsButtonProps } from "./type";



const smoothCardBottomFade =
  "bg-[linear-gradient(to_top,#0F172B_0%,transparent_100%)]";

const ViewAllProjectsButton = ({
  allProjectHref,
  allProjectLabel,
  className,
}: ViewAllProjectsButtonProps) => {
  return (
    <Container
      as="div"
      className={cn("relative min-h-[465px] w-full", className)}
    >
      <AnimatedButton
        text={allProjectLabel ?? "View all projects"}
        link={allProjectHref}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      />
      <Container
        className={cn(
          "pointer-events-none absolute inset-0 z-[1]",
          smoothCardBottomFade,
        )}
        aria-hidden
      />
    </Container>
  );
};

export default ViewAllProjectsButton;
