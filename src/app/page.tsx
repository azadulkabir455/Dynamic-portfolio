import HeroBanner from "@/blocks/sections/frontend/heroBanner/HeroBanner";
import Intro from "@/blocks/sections/frontend/intro/Intro";
import Company from "@/blocks/sections/frontend/company/Company";
import Portfolio from "@/blocks/sections/frontend/portfolio/Portfolio";
import Project from "@/blocks/sections/frontend/project/Project";
import Experience from "@/blocks/sections/frontend/experience/Experience";
import Skills from "@/blocks/sections/frontend/skills/Skills";
import Clients from "@/blocks/sections/frontend/certificates/Certificates";
import Footer from "@/blocks/sections/frontend/footer/Footer";

export default function Page() {
  return (
    <>
      <HeroBanner />
      <Company />
      <Portfolio />
      <Skills />
      <Project />
      <Experience />
      <Clients />
      <Intro />
      <Footer />
    </>
  );
}
