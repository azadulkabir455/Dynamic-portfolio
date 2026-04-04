"use client";

import Particles from "@/blocks/elements/3d/Particles/Particles";
import Container from "@/blocks/elements/container/Container";
import type { HeroBannerProps } from "./type";
import InfoArea from "@/blocks/sections/frontend/heroBanner/component/infoArea/InfoArea";
import ContentArea from "@/blocks/sections/frontend/heroBanner/component/contentArea/ContentArea";
import { defaultHeroBannerData } from "@/blocks/sections/frontend/heroBanner/component/data/Data";

const HeroBanner = ({ content }: HeroBannerProps) => {
  const data =
    content != null
      ? { ...defaultHeroBannerData, ...content }
      : defaultHeroBannerData;

  const {
    imageSrc,
    imageAlt,
    preTitle,
    preTitleHighlight,
    titleLine1,
    titleLine2,
    socialLinks,
    introCircleText,
    introText,
    contactEmail,
    contactPhone,
    whatsappNumber,
    cvHref,
    cvFileName,
  } = data;

  return (
    <Container as="section" className="relative w-full">
      <Container
        as="div"
        className="relative flex min-h-screen flex-col justify-start lg:justify-end"
      >
        <Container as="div" className="absolute inset-0 z-5 overflow-hidden">
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
          preTitle={preTitle}
          preTitleHighlight={preTitleHighlight}
          titleLine1={titleLine1}
          titleLine2={titleLine2}
          socialLinks={socialLinks}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
        />
        <InfoArea
          introCircleText={introCircleText}
          introText={introText}
          contactEmail={contactEmail}
          whatsappNumber={whatsappNumber}
          cvHref={cvHref}
          cvFileName={cvFileName}
        />
      </Container>
    </Container>
  );
};

export default HeroBanner;
