import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { BlogHeaderProps } from "./type";

const BlogHeader = ({ title, paragraph }: BlogHeaderProps) => {
  return (
    <Container as="div" className="text-center">
      <Text
        variant="h2"
        className={cn(
          "font-antonio font-bold capitalize tracking-[0%]",
          "text-[64px] leading-[70px]",
          "text-secondary",
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
          "text-center align-middle text-secondary",
        )}
      >
        {paragraph}
      </Text>
    </Container>
  );
};

export default BlogHeader;
