"use client";

import Container from "@/blocks/elements/container/Container";
import ScrollDownButton from "@/blocks/elements/3d/ScrollDownButton/ScrollDownButton";
import CircularText from "@/blocks/elements/3d/CircularText/CircularText";
import { cn } from "@/utilities/helpers/classMerge";
import type { InfoArea } from "./type";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import Text from "@/blocks/elements/text/Text";

const  InfoArea = ({
    text = "Innovate*Build*Improve*Repeat*",
    email,
    phone,
    cvHref = "/cv.pdf",
    cvFileName = "CV.pdf",
}: InfoArea) => {
    const mailtoHref = email ? `mailto:${email}` : "#";
    const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

    return (
        <Container
            as="div"
            className={cn(
                "maxContainer",
                "flex items-center justify-between gap-8",
                "p-10 rounded-t-xl",
                "bg-[var(--primary)] text-[var(--secondary)]",
            )}
        >
            <Container
                as="div"
                className="relative z-10 basis-[40%] flex flex-col items-center justify-center"
            >
                <ScrollDownButton parentClassName="cursor-target absolute z-10" />
                <CircularText
                    text={text}
                    onHover="pause"
                    spinDuration={20}
                    className=""
                    textClassName="text-3xl uppercase font-medium font-antonio text-secondary"
                />
            </Container>

            <Container as="div" className="basis-[60%] flex flex-col items-start gap-10 justify-start">
                <Text as="p" className="secondaryTextColor text-xl text-semibold leading-relaxed">
                    I am a user-focused and sales-oriented UI/UX Designer with 7+ years of experience. Expertise in Design System and SaaS Product.
                </Text>
                <Container as="div" className="flex items-center gap-5 relative z-10">
                    <AnimatedButton
                        text="Call Me"
                        link={telHref}
                        icon="Phone"
                        iconSize={22}
                        iconClassName="secondaryTextColor text-lg uppercase font-bold"
                        className="w-[220px] px-3 border-1 secondaryBorderColor"
                    />
                    <AnimatedButton
                        text="Email Me"
                        link={mailtoHref}
                        icon="Mail"
                        iconSize={22}
                        iconClassName="secondaryTextColor text-lg uppercase font-bold"
                        className="w-[220px] px-3 border-1 secondaryBorderColor"
                    />
                    <AnimatedButton
                        text="Download CV"
                        link={cvHref}
                        downloadFile={cvFileName}
                        icon="Download"
                        iconSize={22}
                        iconClassName="secondaryTextColor text-lg uppercase font-bold"
                        className="w-[220px] px-3 border-1 secondaryBorderColor"
                    />
                </Container>
            </Container>
        </Container>
    );
};

export default InfoArea;

