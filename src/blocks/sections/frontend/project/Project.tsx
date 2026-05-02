"use client";

import { motion } from "framer-motion";
import Container from "@/blocks/elements/container/Container";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import ProjectCard from "./component/card/ProjectCard";
import type { ProjectSectionData } from "./type";
import { cn } from "@/utilities/helpers/classMerge";
import { defaultProjectData } from "./component/data/Data";
import { useProjectTitleAnimation } from "@/hooks/projectTitle";

function chunkPairs<T>(arr: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    rows.push(arr.slice(i, i + 2));
  }
  return rows;
}

const Project = ({
  title,
  titleClassName,
  projectList,
  viewAllText,
  viewAllUrl,
}: ProjectSectionData) => {
  const heading = title ?? defaultProjectData.title ?? "";
  const list = projectList ?? defaultProjectData.projectList ?? [];
  const allText = viewAllText ?? defaultProjectData.viewAllText;
  const allUrl = viewAllUrl ?? defaultProjectData.viewAllUrl;

  const { sectionRef, fontSize, lineHeight, color } = useProjectTitleAnimation();

  return (
    <Container
      as="section"
      ref={sectionRef}
      className="relative bg-secondary"
      id="projects"
    >
      {/* Sticky animated title — stays centered while cards scroll over it */}
      <Container
        as="div"
        className="sticky top-30 z-20 flex pb-[120px] items-center justify-center"
      >
        <motion.h2
          style={{ fontSize, lineHeight, color }}
          className={cn(
            "font-antonio font-bold capitalize tracking-[0%]",
            "text-center w-full max-w-[900px] px-6",
            titleClassName,
          )}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      </Container>

      {/* Cards — z-10 scrolls over the sticky title */}
      <Container
        as="div"
        className={cn(
          "relative",
          "rounded-t-[24px] pb-[60px] lg:pb-[120px] pt-[80px] lg:pt-[160px]",
          "bg-ternary-light",
        )}
      >
        <Container as="div" className={cn("maxContainer relative z-30")}>
          <Container as="div" className={cn("flex flex-col gap-10 lg:gap-40")}>
            {chunkPairs(list).map((pair, rowIdx) => (
              <Container
                as="div"
                key={pair.map((p) => p.detailsUrl).join("|")}
                className={cn(
                  "grid grid-cols-1 gap-10 lg:gap-40 lg:grid-cols-2",
                  rowIdx % 2 === 0
                    ? "justify-items-start"
                    : "justify-items-end",
                )}
              >
                {pair.map((item, j) => (
                  <ProjectCard
                    key={item.detailsUrl}
                    {...item}
                    className={cn(j === 1 && "lg:mt-[250px]")}
                  />
                ))}
              </Container>
            ))}
          </Container>
          <Container
            as="div"
            className={cn("mt-[120px] flex justify-center")}
          >
            <AnimatedButton
              text={allText ?? ""}
              link={allUrl ?? "#"}
              className="flex justify-center"
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Project;
