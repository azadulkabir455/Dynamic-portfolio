import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { getSafeLink } from "@/blocks/elements/3d/AnimatedButton/function";
import type { ProjectsOneProps } from "./type";
import { cn } from "@/utilities/helpers/classMerge";
import { ProjectCard } from "./component/card/ProjectCard";
import { PROJECT_DEMO_LIST } from "./projectList";

const defaultTitle = "Experiments & Execution";
const defaultDescription =
  "A collection of projects built to solve real-world problems using modern technologies, focusing on scalability, performance, and practical implementation.";

const Project = ({
  title = defaultTitle,
  description = defaultDescription,
  titleClassName,
  descriptionClassName,
  buttonText = "View All",
  link = "#projects",
  buttonIcon = "Eye",
}: ProjectsOneProps) => {
  const href = getSafeLink(link);

  const leftProjects = PROJECT_DEMO_LIST.filter((_, i) => i % 2 === 0);
  const rightProjects = PROJECT_DEMO_LIST.filter((_, i) => i % 2 === 1);

  if (leftProjects.length === 0 || rightProjects.length === 0) {
    return null;
  }

  return (
    <Container
      as="section"
      className={cn("relative maxContainer w-full bg-secondary py-[120px]")}
      id="projects"
    >
      <Container
        as="div"
        className={cn("flex px-10")}
      >
        <Container
          as="div"
          className={cn("flex w-full flex-col gap-10")}
        >
          {leftProjects.map((project, i) => (
            <ProjectCard
              key={project.viewDetailsLink}
              index={2 * i + 1}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              category={project.category}
              title={project.title}
              features={project.features}
              liveLink={project.liveLink}
              viewDetailsLink={project.viewDetailsLink}
            />
          ))}
          <AnimatedButton
            text={buttonText}
            link={href}
            icon={buttonIcon}
            iconSize={22}
            dark={true}
            bordered={false}
            className={cn(
              "w-full max-w-[280px] self-start",
              "mt-10 px-3",
            )}
          />
        </Container>

        <Container
          as="div"
          className={cn("flex w-full flex-col gap-10")}
        >
          <Container
            as="div"
            className={cn("flex min-w-0 flex-col gap-4 sm:gap-5")}
          >
            <Text
              variant="h2"
              className={cn(
                "text-[100px] font-bold capitalize leading-tight tracking-wide text-primary",
                titleClassName,
              )}
            >
              {title}
            </Text>
          </Container>
          {rightProjects.map((project, i) => (
            <Container
              as="div"
              key={project.viewDetailsLink}
              className={cn("w-full")}
            >
              <ProjectCard
                index={2 * i + 2}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                category={project.category}
                title={project.title}
                features={project.features}
                liveLink={project.liveLink}
                viewDetailsLink={project.viewDetailsLink}
              />
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default Project;
