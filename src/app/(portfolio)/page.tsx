import HeroBanner from "@/blocks/sections/frontend/heroBanner/HeroBanner";
import Company from "@/blocks/sections/frontend/company/Company";
import Portfolio from "@/blocks/sections/frontend/portfolio/Portfolio";
import Skills from "@/blocks/sections/frontend/skills/Skills";
import Project from "@/blocks/sections/frontend/project/Project";
import Experience from "@/blocks/sections/frontend/experience/Experience";
import Intro from "@/blocks/sections/frontend/intro/Intro";
import Blog from "@/blocks/sections/frontend/blog/Blog";

export default function Page() {
  return (
    <>
      <HeroBanner />
      <Company />
      <Portfolio />
      <Skills />
      <Project />
      <Experience />
      <Intro />
      <Blog />
      {/* <Clients />
      <Footer /> */}
    </>
  );
}
