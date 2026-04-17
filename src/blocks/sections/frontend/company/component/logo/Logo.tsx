import Image from "@/blocks/elements/image/Image";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import type { LogoProps } from "./type";

const Logo = ({ src, alt }: LogoProps) => {
  return (
    <Container
      as="div"
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden",
        "rounded-[10px] p-8 xl:p-10",
        "h-[130px] xl:h-[140px] w-full xl:w-[230px]",
        "bg-[url('/images/Icons/companyBackground.png')] bg-contain bg-center bg-no-repeat",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className={cn("h-auto max-h-full w-auto max-w-full object-contain")}
      />
    </Container>
  );
};

export default Logo;
