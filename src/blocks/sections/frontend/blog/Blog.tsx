"use client";

import Container from "@/blocks/elements/container/Container";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";
import BlogCard from "./component/card/Card";
import BlogHeader from "./component/header/BlogHeader";
import { defaultBlogData } from "./component/data/Data";
import type { BlogSectionData } from "./type";

const Blog = ({
    title,
    paragraph,
    blogs,
    viewAllText,
    viewAllUrl,
}: BlogSectionData = defaultBlogData) => {
    const sectionTitle = title ?? defaultBlogData.title ?? "";
    const sectionParagraph = paragraph ?? defaultBlogData.paragraph ?? "";
    const list = blogs ?? defaultBlogData.blogs ?? [];
    const ctaText = viewAllText ?? defaultBlogData.viewAllText ?? "View All Blog";
    const ctaUrl = viewAllUrl ?? defaultBlogData.viewAllUrl ?? "/blog";

    return (
        <Container
            as="section"
            id="blog"
            className={cn(
                "relative z-10",
                "ternaryLightBacgroundColor",
                "mt-[130px] pt-[120px]",
                "rounded-t-[40px]"
            )}
        >
            <Container as="div" className="maxContainer">
                <BlogHeader title={sectionTitle} paragraph={sectionParagraph} />
                <Container
                    as="div"
                    className="mt-15 grid grid-cols-1 items-stretch gap-9 md:grid-cols-2 lg:grid-cols-3"
                >
                    {list.map((item) => (
                        <BlogCard key={item.id} item={item} />
                    ))}
                </Container>
                <Container as="div" className="mt-15 flex justify-center">
                    <AnimatedButton text={ctaText} link={ctaUrl} />
                </Container>
            </Container>
    </Container>
    );
};

export default Blog;
