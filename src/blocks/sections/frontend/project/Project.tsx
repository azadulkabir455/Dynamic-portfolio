import Container from "@/blocks/elements/container/Container";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import ProjectCard from "./component/card/ProjectCard";
import Text from "@/blocks/elements/text/Text";
import type { ProjectSectionData } from "./type";
import { cn } from "@/utilities/helpers/classMerge";
import { defaultProjectData } from "./component/data/Data";

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
  return (
    <Container
      as="section"
      className={cn(
        "relative bg-secondary",
      )}
      id="projects"
    >
      <Container
        as="div"
        className={cn("maxContainer sticky top-[120px] z-1")}
      >
        <Text
          variant="h2"
          className={cn(
            "font-antonio font-bold",
            "text-[70px] lg:text-[114px] leading-[80px] lg:leading-[120px] tracking-normal",
            "text-center capitalize",
            "bg-gradient-to-b from-primary to-ternary bg-clip-text text-transparent",
            "[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]",
            "pb-[60px] lg:pb-[120px]",
            titleClassName,
          )}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      </Container>
      <Container
        as="div"
        className={cn(
          "rounded-t-[24px] pb-[60px] lg:pb-[120px] pt-[120px] lg:pt-[240px]",
          "bg-gradient-to-t from-ternary-light to-ternary",
        )}
      >
        <Container
          as="div"
          className={cn("maxContainer relative z-5")}
        >
          <Container 
          as="div" 
          className={cn("flex flex-col gap-10 lg:gap-40")}>
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
