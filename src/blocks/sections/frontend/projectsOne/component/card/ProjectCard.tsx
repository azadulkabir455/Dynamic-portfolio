import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";
import type { ProjectCardProps } from "./type";
import CircularText from "@/blocks/elements/3d/CircularText/CircularText";

export const ProjectCard = ({
    imageSrc,
    imageAlt,
    category,
    title,
    features,
    liveLink,
    viewDetailsLink,
    liveButtonText = "Live",
    viewDetailsButtonText = "View details",
    liveIcon = "ExternalLink",
    viewDetailsIcon = "Eye",
    index = 1,
    className,
}: ProjectCardProps) => {
    return (
        <>
            <Container
                as="div"
                role="article"
                aria-label={imageAlt}
                className={cn(
                    "relative flex w-[80%] flex-col justify-end rounded-xl",
                    "min-h-[750px]",
                    "shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
                    className,
                )}
                bg={{
                    image: imageSrc,
                    size: "cover",
                    position: "top center",
                }}
                bgClassName="bg-cover bg-no-repeat"
            >

                <Container
                    as="div"
                    className={cn(
                        "absolute right-0 top-1/4",
                        "flex size-[180px] translate-x-1/2 translate-y-[60%] items-center justify-center",
                        "rounded-full bg-primary border-6 border-secondary",
                    )}
                >
                    <CircularText
                        text="project*project*project*project*project*"
                        onHover="pause"
                        spinDuration={20}
                        className=""
                        textClassName={cn(
                            "font-open-sans text-xs font-bold uppercase",
                            "text-secondary",
                        )}
                    />
                    <Text
                        variant="p"
                        className={cn(
                            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            "font-antonio text-[80px] font-bold leading-none tabular-nums",
                            "text-secondary",
                        )}
                    >
                        {index}
                    </Text>
                </Container>
                <Container
                    as="div"
                    className={cn(
                        "flex w-full flex-col h-[300px] justify-between",
                        "rounded-xl bg-primary",
                        "p-5",
                    )}
                >
                    <Container as="div" className="flex flex-col">
                        <Text
                            variant="span"
                            className={cn(
                                "inline-flex w-fit items-center rounded-full",
                                "bg-secondary/45",
                                "px-3 py-1.5",
                                "font-open-sans text-[10px] font-semibold uppercase tracking-[0.2em]",
                                "text-secondary",
                                "shadow-sm shadow-black/5",
                            )}
                        >
                            {category}
                        </Text>

                        <Text
                            variant="h3"
                            className={cn(
                                "font-antonio text-[40px] font-bold capitalize leading-relaxed",
                                "text-secondary mt-1",
                                "line-clamp-1",
                            )}
                        >
                            {title}
                        </Text>

                        <Text
                            variant="p"
                            className={cn(
                                "mt-2 font-open-sans text-sm leading-snug sm:text-base",
                                "text-secondary/90",
                                "line-clamp-2",
                            )}
                        >
                            {features}
                        </Text>
                    </Container>

                    <Container
                        as="div"
                        className={cn(
                            "mt-5 grid w-full grid-cols-2 gap-3",
                            'border-t border-secondary/25 pt-5',
                        )}
                    >
                        <AnimatedButton
                            text={liveButtonText}
                            link={liveLink}
                            icon={liveIcon}
                            iconSize={18}
                            iconClassName="text-white"
                            textClassName="text-white"
                            dark={false}
                            className={cn(
                                "min-w-0 w-full border-white/25",
                                "hover:bg-white/20",
                                "px-3",
                            )}
                        />
                        <AnimatedButton
                            text={viewDetailsButtonText}
                            link={viewDetailsLink}
                            icon={viewDetailsIcon}
                            iconSize={18}
                            iconClassName="text-white"
                            textClassName="text-white"
                            dark={false}
                            className={cn(
                                "min-w-0 w-full border-white/25",
                                "hover:bg-white/20",
                                "px-3",
                            )}
                        />
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default ProjectCard;
