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
        "rounded-[10px] p-0 md:p-5 xl:p-10",
        " h-[100px] md:h-[120px] lg:h-[140px] w-full xl:w-[230px]",
        "bg-[url('/images/Icons/companyBackground.png')] bg-cover lg:bg-contain bg-center bg-no-repeat",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className={cn("h-[60px] md:h-[90px] lg:h-[100px] max-h-full w-[70%] md:w-full max-w-full object-contain brightness-0 invert")}
      />
    </Container>
  );
};

export default Logo;
