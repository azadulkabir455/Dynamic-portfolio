import type { BlogSectionData } from "../../type";

export const defaultBlogData: BlogSectionData = {
  title: "Blog",
  paragraph:
    "I am a passionate Senior Frontend Engineer with 7+ years of industry experience building scalable, high-performance web applications.",
  blogs: [
    {
      id: "1",
      image: "/images/portfolio/pf1.jpg",
      imageAlt: "Blog cover 1",
      title: "Claude Design Beats Every AI Design Tool!",
      href: "/blog/claude-design-beats-every-ai-design-tool",
    },
    {
      id: "2",
      image: "/images/portfolio/pf1.jpg",
      imageAlt: "Blog cover 2",
      title: "Claude Design Beats Every AI Design Tool!",
      href: "/blog/claude-design-beats-every-ai-design-tool-2",
    },
    {
      id: "3",
      image: "/images/portfolio/pf1.jpg",
      imageAlt: "Blog cover 3",
      title: "Claude Design Beats Every AI Design Tool!",
      href: "/blog/claude-design-beats-every-ai-design-tool-3",
    },
  ],
  viewAllText: "View All Blog",
  viewAllUrl: "/blog",
};
