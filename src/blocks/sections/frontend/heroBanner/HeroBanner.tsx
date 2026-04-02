"use client";

import Particles from "@/blocks/elements/3d/Particles/Particles";
import Container from "@/blocks/elements/container/Container";
import type { HeaderContent } from "./type";
import InfoArea from "@/blocks/sections/frontend/heroBanner/component/infoArea/InfoArea";
import ContentArea from "@/blocks/sections/frontend/heroBanner/component/contentArea/ContentArea";

const defaultContent = {
  title: "Hi, I am Brooklyn Simmons",
  subtitle: "a Product Designer",
  stats: [
    { value: "40K", label: "Winning award" },
    { value: "100K", label: "Complete project" },
    { value: "850+", label: "Client Feedback" },
  ],
  biographyTitle: "Biography :",
  biographyText:
    "I'm a freelance product designer & developer based in London. I'm very passionate about the work I do.",
  contactTitle: "Contact :",
  contact: {
    address: "1179 KFC Road,Lisbon, Portugal",
    email: "info@example.com",
    phone: "(629) 555-0129",
  },
  imageSrc: "/images/fatema.webp",
  imageAlt: "Portrait",
};

export interface HeaderProps {
  content?: HeaderContent;
}

const HeroBanner = ({ content = defaultContent }: HeaderProps) => {
  const { imageSrc, imageAlt } = content;

  return (
    <Container as="section" className="relative w-full overflow-hidden">
      <Container
        as="div"
        className="relative min-h-screen flex flex-col justify-end"
      >
        <Container as="div" className="absolute inset-0 z-5">
          <Particles
            particleColors={["#C33F40"]}
            particleCount={200}
            particleSpread={9}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </Container>

        <ContentArea 
          imageSrc={imageSrc} 
          imageAlt={imageAlt} 
        />  
        <InfoArea />
      </Container>
    </Container>
  );
};

export default HeroBanner;

