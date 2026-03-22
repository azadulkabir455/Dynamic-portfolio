import Container from "@/blocks/elements/container/Container";
import ProjectHeader from "@/blocks/sections/frontend/projectsOne/component/header/ProjectHeader";
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
  return (

      <Container
        as="section"
        className={cn("bg-secondary w-full py-[120px] maxContainer relative")}
        id="projects"
      >

        <ProjectHeader
          title={title}
          description={description}
          titleClassName={titleClassName}
          descriptionClassName={descriptionClassName}
          buttonText={buttonText}
          link={link}
          buttonIcon={buttonIcon}
        />

        <Container
          as="div"
          className={cn(
            "grid grid-cols-1 gap-10 pt-20",
            "md:grid-cols-2",
          )}
        >
          {PROJECT_DEMO_LIST.map((project, i) => (
            <div
              key={project.viewDetailsLink}
              className={cn(
                "w-full",
                i % 2 === 1 && "md:mt-20",
              )}
            >
              <ProjectCard
                index={i + 1}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                category={project.category}
                title={project.title}
                features={project.features}
                liveLink={project.liveLink}
                viewDetailsLink={project.viewDetailsLink}
              />
            </div>
          ))}
        </Container>
      </Container>
  );
};

export default Project;
