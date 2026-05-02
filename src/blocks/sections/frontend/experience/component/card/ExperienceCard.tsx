import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { ExperienceCardProps } from "./type";

const ExperienceCard = ({ item }: ExperienceCardProps) => {
  return (
    <Container
      as="article"
      className={cn(
        "w-[312px] rounded-[24px] p-[30px]",
        "bg-gradient-to-b from-[#cf4c50] to-[#b83237]",
        "border border-primary/20",
        "shadow-[0_8px_24px_rgba(140,30,34,0.22)]",
      )}
    >
      <Container as="div" className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <Text
          variant="h3"
          className="font-open-sans text-[17px] font-bold leading-[22px] text-white"
        >
          {item.company}
        </Text>
        <Text
          variant="span"
          className="font-open-sans text-[13px] font-medium text-white/70"
        >
          · {item.workType}
        </Text>
      </Container>

      <Text
        variant="p"
        className="mt-3 font-open-sans text-[13px] leading-[20px] text-white/85"
      >
        <Text as="span" variant="span" className="font-semibold text-white">Office Info:</Text>{" "}
        {item.officeInfo}
      </Text>

      <Text
        variant="p"
        className="mt-3 font-open-sans text-[13px] leading-[20px] text-white/85"
      >
        <Text as="span" variant="span" className="font-semibold text-white">{item.roleLabel}:</Text>{" "}
        {item.role}
      </Text>

      <Text
        variant="p"
        className="mt-4 font-open-sans text-[13px] font-bold leading-[18px] text-[#ffd166]"
      >
        {item.period}
      </Text>
    </Container>
  );
};

export default ExperienceCard;
