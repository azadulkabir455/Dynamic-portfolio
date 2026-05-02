import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { IntroHeaderProps } from "./type";

const IntroHeader = ({ title, paragraph }: IntroHeaderProps) => {
  return (
    <Container as="div" className="text-center">
      <Text
        variant="h1"
        className={cn(
          "font-antonio font-bold capitalize tracking-[0%]",
          "text-[64px] leading-[70px]",
          "text-primary",
        )}
      >
        {title}
      </Text>

      <Text
        variant="p"
        className={cn(
          "mx-auto mt-6 max-w-[700px]",
          "font-open-sans font-normal tracking-[0%]",
          "text-[20px] leading-[36px]",
          "text-center align-middle text-ternary-light",
        )}
      >
        {paragraph}
      </Text>
    </Container>
  );
};

export default IntroHeader;
