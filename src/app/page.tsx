import Container from "@/blocks/elements/container/Container";
import HeraBanner from "@/blocks/sections/frontend/heroBanner/HeroBanner";
import Objective from "@/blocks/sections/frontend/objective/Objective";
import Project from "@/blocks/sections/frontend/projectsOne/Project";
import Experience from "@/blocks/sections/frontend/Experience/Edperience";

export default function Page() {
  
  return (
    <Container
      as="div"
      className="overflow-x-hidden overflow-y-visible"
    >
      <HeraBanner />
      <Objective />
      <Project /> 
      <Experience />
    </Container>
  );
}