import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Image from "@/blocks/elements/image/Image";
import { cn } from "@/utilities/helpers/classMerge";
import type { BlogCardData } from "./type";
import Link from "@/blocks/elements/link/Link";

type BlogCardProps = {
  item: BlogCardData;
};

const BlogCard = ({ item }: BlogCardProps) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "group block h-full w-full rounded-[24px] bg-[#4A4E74]",
        "px-[20px] pt-[20px] pb-[40px]",
        "transition-transform duration-300 hover:-translate-y-0.5",
      )}
      aria-label={item.title}
    >
      <Container as="article" className="flex h-full flex-col">
        <Image
          src={item.image}
          alt={item.imageAlt ?? item.title}
          width={320}
          height={210}
          className="h-[210px] w-full rounded-[24px] object-cover object-top"
        />
        <Text
          variant="h3"
          className={cn(
            "mt-6 font-open-sans font-bold tracking-[0%]",
            "text-[21px] leading-[32px]",
            "align-middle text-secondary",
            "line-clamp-2",
          )}
        >
          {item.title}
        </Text>
      </Container>
    </Link>
  );
};

export default BlogCard;
