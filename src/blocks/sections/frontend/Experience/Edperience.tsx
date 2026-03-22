import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Timeline from "@/blocks/elements/3d/Timeline/Timeline";
import { DEFAULT_TIMELINE_ITEMS } from "@/blocks/sections/frontend/Experience/timelineData";
import { cn } from "@/utilities/helpers/classMerge";

const Experience = () => {
  return (
    <Container
      as="section"
      className="bg-primary w-full rounded-t-xl pt-5"
      id="experience"
    >
      <Container
        as="div"
        className="quaternaryBacgroundColor w-full pt-5 rounded-t-xl"
      >
        <Container
          as="div"
          className="relative ternaryBacgroundColor w-full pt-8 pb-16 md:pb-24 rounded-t-xl"
        >
          <Container
            as="div"
            className={cn(
              "maxContainer flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16",
              "px-4 md:px-6",
            )}
          >
            <Container
              as="div"
              className={cn(
                "shrink-0 lg:max-w-[min(100%,380px)]",
                "lg:pt-[200px]",
              )}
            >
              <Container
                as="div"
                className="lg:sticky lg:top-[30px] lg:self-start"
              >
                <Text
                  variant="h2"
                  className="font-antonio mb-4 text-4xl text-secondary md:text-5xl"
                >
                  Experience
                </Text>
                <Text
                  variant="p"
                  className="font-open-sans text-base leading-relaxed text-secondary/90 md:text-lg"
                >
                  Roles and milestones — interactive timeline with highlights on
                  the right.
                </Text>
              </Container>
            </Container>

            <Container as="div" className="min-w-0 flex-1">
              <Timeline items={DEFAULT_TIMELINE_ITEMS} showSpine />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Experience;
