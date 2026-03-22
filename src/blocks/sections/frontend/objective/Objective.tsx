import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Image from "@/blocks/elements/image/Image";
import { cn } from "@/utilities/helpers/classMerge";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import type { ObjectiveLogo, ObjectiveProps } from "./type";

const DEFAULT_LOGOS: ObjectiveLogo[] = [
  { src: "/images/logo/americanbestit.png", alt: "American Best IT", href: "#" },
  { src: "/images/logo/beatnik.png", alt: "Beatnik", href: "#" },
  { src: "/images/logo/beshto.png", alt: "Beshto", href: "#" },
  { src: "/images/logo/telnor.png", alt: "Telnor", href: "#" },
  { src: "/images/logo/iovison.png", alt: "Arla", href: "#" },
  { src: "/images/logo/orangetoolz.png", alt: "Orange Toolz", href: "#" },
  { src: "/images/logo/zam.avif", alt: "Zam", href: "#" },
  { src: "/images/logo/sheba.avif", alt: "Sheba", href: "#" },
  { src: "/images/logo/marico.avif", alt: "Marico", href: "#" },
];

const DEFAULT_PARAGRAPH =
  "Mission-driven and collaborative problem solver with proven experience conducting in-depth research, designing innovative products, and leading design teams. Mainly associated with product, UI, UX, iOS and Android mobile application design, Themeforest template and startups.";

const Objective = ({
  titlePrefix = "Companies",
  titleEmphasis = "I’ve grown with",
  paragraph = DEFAULT_PARAGRAPH,
  logos = DEFAULT_LOGOS,
  buttonText = "Video Resume",
  buttonLink = "#contact",
  buttonIcon = "Youtube",
  buttonIconSize = 22,
  buttonIconClassName = "text-white",
  buttonTextClassName = "text-white",
  buttonClassName = cn("mt-12 w-[220px]", "border border-secondary px-3"),
}: ObjectiveProps) => {
  return (
    <Container
      as="section"
      id="objective"
      className={cn(
        "bg-primary rounded-b-xl",
        "maxContainer",
        "px-10 pb-[120px]",
      )}
    >
      <Container
        as="div"
        className={cn(
          "pt-[120px]",
          "border-t border-secondary",
        )}
      >
        <Container
          as="div"
          className={cn(
            "flex items-center",
            "gap-10",
          )}
        >
          <Container
            as="div"
            className={cn(
              "basis-[50%] flex flex-col",
              "gap-5",
            )}
          >
            <Text
              variant="h2"
              className={cn(
                "text-secondary",
                "font-bold tracking-wide capitalize",
                "text-[100px] leading-[110%]",
              )}
            >
              {titlePrefix}
              <span className="inine lg:block">{titleEmphasis}</span>
            </Text>
            <Text
              variant="p"
              className={cn(
                "mt-2",
                "text-secondary",
                "font-open-sans",
                "text-xl leading-relaxed",
              )}
            >
              {paragraph}
            </Text>

            <AnimatedButton
              text={buttonText}
              link={buttonLink}
              icon={buttonIcon}
              iconSize={buttonIconSize}
              iconClassName={buttonIconClassName}
              textClassName={buttonTextClassName}
              className={buttonClassName}
            />
          </Container>

          <Container
            as="div"
            className={cn(
              "basis-[50%] grid grid-cols-3",
              "gap-0.5 p-1.5",
              "rounded-xl",
              "overflow-hidden",
            )}
          >
            {logos.map((logo, index) => (
              <Container
                key={`objective-logo-${index}`}
                as="div"
                className={cn(
                  "min-h-[200px]",
                  "flex items-center justify-center",
                  "bg-[#d35a5a]",
                  "border border-[#c95050]",
                  "rounded-[10px]",
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={44}
                  className={cn(
                    "w-auto h-9 object-contain",
                    "grayscale brightness-0 invert opacity-90",
                  )}
                />
              </Container>
            ))}
          </Container>
          </Container>
      </Container>
    </Container>
  );
};

export default Objective;