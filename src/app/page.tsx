import Container from "@/blocks/elements/container/Container";
import Intro from "@/blocks/sections/frontend/Intro/Intro";
import HeraBanner from "@/blocks/sections/frontend/heroBanner/HeroBanner";
import Objective from "@/blocks/sections/frontend/objective/Objective";
import Project from "@/blocks/sections/frontend/projectsOne/Project";
import Experience from "@/blocks/sections/frontend/experience/Edperience";
import ProjectTwo from "@/blocks/sections/frontend/projectTwo/ProjectTwo";
import Footer from "@/blocks/sections/frontend/Footer/Footer";

export default function Page() {
  return (
    <Container
      as="div"
      className="overflow-x-clip overflow-y-visible"
    >
      <HeraBanner />
      <Objective />
      <Project />
      <Experience />
      <Intro />
      <ProjectTwo />
      <Footer />
    </Container>
  );
}