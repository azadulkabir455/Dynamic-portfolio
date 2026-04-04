import Intro from "@/blocks/sections/frontend/intro/Intro";
import Objective from "@/blocks/sections/frontend/objective/Objective";
import Project from "@/blocks/sections/frontend/projectsOne/Project";
import Experience from "@/blocks/sections/frontend/experience/Experience";
import ProjectTwo from "@/blocks/sections/frontend/projectTwo/ProjectTwo";
import Footer from "@/blocks/sections/frontend/footer/Footer";

export default function Page() {
  return (
    <>
      <Objective />
      <Project />
      <Experience />
      <Intro />
      <ProjectTwo />
      <Footer />
    </>
  );
}
