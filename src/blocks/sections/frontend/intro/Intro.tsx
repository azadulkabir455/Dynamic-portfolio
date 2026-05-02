"use client";

import { motion } from "framer-motion";
import { Play, Volume2 } from "lucide-react";
import Container from "@/blocks/elements/container/Container";
import CircularText from "@/blocks/elements/3d/CircularText/CircularText";
import { cn } from "@/utilities/helpers/classMerge";
import { useIntroVideoScroll } from "@/hooks/introVideo";
import { buildYouTubeEmbedUrl } from "./function";
import IntroHeader from "./component/header/IntroHeader";
import { defaultIntroData } from "./component/data/Data";
import type { IntroProps } from "./type";

const Intro = ({
  title,
  paragraph,
  youtubeId,
}: IntroProps = defaultIntroData) => {
  const { sectionRef, iframeRef, isMuted, toggleMute, paddingX, borderRadius, headerY, headerFilter, videoY } =
    useIntroVideoScroll();

  const sectionTitle = title ?? defaultIntroData.title ?? "";
  const sectionParagraph = paragraph ?? defaultIntroData.paragraph ?? "";
  const sectionYoutubeId = youtubeId ?? defaultIntroData.youtubeId ?? "";

  return (
    <Container
      as="section"
      ref={sectionRef}
      className="relative bg-secondary"
      id="intro"
      style={{ minHeight: "300vh" }}
    >
      <Container as="div" className="sticky top-0 flex h-screen flex-col py-10 lg:py-14">
        <motion.div
          className="maxContainer mb-[60px] text-center"
          style={{ y: headerY, filter: headerFilter }}
        >
          <IntroHeader title={sectionTitle} paragraph={sectionParagraph} />
        </motion.div>

        <motion.div
          className="flex flex-1 items-center"
          style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        >
          <motion.div
            className="relative w-full overflow-hidden"
            style={{ borderRadius, aspectRatio: "16 / 9", maxHeight: "100vh", y: videoY }}
          >
            <iframe
              ref={iframeRef}
              src={buildYouTubeEmbedUrl(sectionYoutubeId)}
              title={sectionTitle}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "100%",
                height: "100%",
                minWidth: "177.78vh",
                minHeight: "56.25vw",
              }}
            />

            <Container
              as="div"
              className="absolute inset-0 z-10 flex cursor-default items-center justify-center"
            >
              <button
                onClick={toggleMute}
                className="relative cursor-pointer"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                <CircularText
                  text={isMuted ? "WATCH • VIDEO • Must  • " : "CLICK • MUTE • Video • "}
                  spinDuration={15}
                  onHover="pause"
                  className="h-[150px] w-[150px] bg-primary"
                  textClassName={cn(
                    "font-open-sans font-bold leading-[18px] tracking-[0.15em]",
                    "text-[15px] text-secondary",
                  )}
                />
                <Container
                  as="div"
                  className="absolute inset-0 flex items-center justify-center cursor-target"
                >
                  <Container
                    as="div"
                    className="flex items-center justify-center rounded-full bg-secondary p-6"
                  >
                    {isMuted ? (
                      <Play
                        className="ml-1 text-primary"
                        style={{ width: 40, height: 44 }}
                        fill="currentColor"
                      />
                    ) : (
                      <Volume2
                        className="text-primary"
                        style={{ width: 40, height: 44 }}
                      />
                    )}
                  </Container>
                </Container>
              </button>
            </Container>
          </motion.div>
        </motion.div>
      </Container>
    </Container>
  );
};

export default Intro;
