"use client";

import GlassIcons from "@/blocks/elements/3d/GlassIcons/GlassIcons";
import Icon from "@/blocks/elements/icon/Icon";
import Container from "@/blocks/elements/container/Container";
import type { ContentAreaProps } from "./type";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";

const ContentArea = ({ imageSrc, imageAlt }: ContentAreaProps) => {
    return (
        <Container
            as="div"
            className="flex items-end justify-between gap-8 maxContainer"
        >
            <Container as="div" className="relative basis-[40%] flex items-center justify-center">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={500}
                    height={500}
                    className="object-contain object-bottom px-8 grayscale"
                    priority
                />
            </Container>
            <Container as="div" className="basis-[60%] flex flex-col items-start justify-bottom">
                <Text variant="p" className="relative -bottom-2 text-lg font-semibold textTextColor font-open-sans capitalize">
                    I am 
                    <Text variant="span" className="primaryTextColor"> Fatema Tuz Sultana </Text>
                </Text>
                <Text variant="h1" className="text-[130px] leading-[100%] font-bold text-[var(--primary)]">
                Senior 
                <Container as="span" className="block"> UI UX Designer </Container>
                </Text>

                <Container as="div" className="flex py-15 relative z-10">
                <GlassIcons
                    items={[
                        {
                            icon: <Icon name="Linkedin" size={22} className="secondaryTextColor" />,
                            color: "blue",
                            label: "Linkedin",
                        },
                        {
                            icon: <Icon name="Behance" size={22} className="secondaryTextColor" />,
                            color: "skyblue",
                            label: "Behance",
                        },
                        {
                            icon: <Icon name="Dribbble" size={22} className="secondaryTextColor" />,
                            color: "pink",
                            label: "Dribbble",
                        },
                    ]}
                />
                </Container>
            </Container>
        </Container>
    );
};

export default ContentArea;

