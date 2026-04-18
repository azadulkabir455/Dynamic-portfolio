import Container from "@/blocks/elements/container/Container";
import HeroBanner from "@/blocks/sections/frontend/heroBanner/HeroBanner";
import HeroForm from "@/blocks/sections/dashboard/hero/HeroForm";
import { dashboardContentCardClass } from "@/blocks/sections/dashboard/layout/data";
import { cn } from "@/utilities/helpers/classMerge";

export default function AdminHeroPage() {
  return (
    <Container className="w-full min-w-0 pl-0 pr-0 pt-0 md:pr-[20px]">
      <Container className="flex w-full min-w-0 flex-col gap-[20px] md:flex-row md:items-start md:gap-[20px]">
        <Container className="w-full shrink-0 md:w-[450px] md:shrink-0">
          <Container className={cn(dashboardContentCardClass, "p-4 md:p-5")}>
            <HeroForm />
          </Container>
        </Container>
        <Container
          className={cn(
            "flex w-full min-w-0 flex-1 flex-col items-center md:justify-start",
            "md:sticky md:top-0",
          )}
        >
          <Container
            className={cn(dashboardContentCardClass, "w-fit max-w-full shrink-0 bg-secondary p-0 [zoom:0.5]")}
          >
            <Container>
              <HeroBanner variant="dashboardPreview" />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
