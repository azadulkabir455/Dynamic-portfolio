import Intro from "@/blocks/sections/frontend/intro/Intro";
import Objective from "@/blocks/sections/frontend/objective/Objective";
import Project from "@/blocks/sections/frontend/project/Project";
import Experience from "@/blocks/sections/frontend/experience/Experience";
import Clients from "@/blocks/sections/frontend/certificates/Certificates";
import ProjectTwo from "@/blocks/sections/frontend/portfolio/Portfolio";
import Footer from "@/blocks/sections/frontend/footer/Footer";

export default function Page() {
  return (
    <>
      <Objective />
      <Project />
      <Experience />
      <Clients />
      <Intro />
      <ProjectTwo />
      <Footer />
    </>
  );
}
