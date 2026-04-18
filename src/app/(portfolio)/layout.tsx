import Container from "@/blocks/elements/container/Container";
import ClickSpark from "@/blocks/elements/3d/ClickSpark/ClickSpark";
import LiquidScrollTop from "@/blocks/elements/3d/LiquidScrollTop/LiquidScrollTop";
import PageLoadLoader from "@/blocks/elements/3d/PageLoadLoader/PageLoadLoader";
import { PageLoadLoaderProvider } from "@/blocks/elements/3d/PageLoadLoader/functions";
import TargetCursor from "@/blocks/elements/3d/TargetCursor/TargetCursor";
import BubbleMenu from "@/blocks/elements/3d/BubbleMenu/BubbleMenu";
import { defaultItems } from "@/blocks/elements/3d/BubbleMenu/functions";
import { ParallaxRoot } from "@/hooks/parallax";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageLoadLoaderProvider>
      <ParallaxRoot>
        <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={25}
          sparkCount={8}
          duration={400}
        >
          <Container
            as="div"
            className={cn(
              "fixed top-[20px] lg:top-[50px] z-[100] max-w-none",
              "flex flex-row flex-wrap items-center justify-end gap-2",
              "right-[max(20px,calc((100vw-1280px)/2+20px))]",
            )}
          >
            <AnimatedButton
              text="Talk With"
              link="https://wa.me/8801704337027"
              isWhatsApp={true}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            />
            <AnimatedButton
              text="Resume"
              link="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              iconName="Download"
              className="border border-primary bg-secondary text-primary hover:text-secondary"
            />
            <BubbleMenu
              items={defaultItems}
              menuAriaLabel="Toggle navigation"
              menuBg="var(--primary)"
              menuContentColor="var(--secondary)"
              useFixedPosition={false}
              animationEase="back.out(1.5)"
              animationDuration={0.5}
              staggerDelay={0.12}
              className="!relative !left-auto !right-auto !top-0 !w-auto !px-0"
            />
          </Container>
          <LiquidScrollTop />
          <Container
            as="div"
            className="flex flex-col gap-0 overflow-x-clip overflow-y-visible"
          >
            {children}
          </Container>
          <PageLoadLoader />
        </ClickSpark>
      </ParallaxRoot>
    </PageLoadLoaderProvider>
  );
}
