import Text from "@/blocks/elements/text/Text";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import HomePageSectionsPanel from "@/blocks/sections/dashboard/dashbord/HomeSectionVisibility";
import { dashboardContentCardClass } from "@/blocks/sections/dashboard/layout/data";
import { cn } from "@/utilities/helpers/classMerge";

export default function AdminDashboardHomePage() {
  return (
    <Container className="flex w-full min-w-0 flex-col gap-2.5 md:gap-5">
      <Container className={cn(dashboardContentCardClass, "p-6 md:p-8")}>
        <Text variant="h1" className="font-sans text-2xl font-bold text-ternary">
          Dashboard
        </Text>
        <Text variant="p" className="mt-2 font-sans text-sm leading-relaxed text-text">
          Welcome to your portfolio admin. Use the sidebar to jump to each section. Content editors will
          plug in here next.
        </Text>
        <Container className="mt-6">
          <Button
            href="/"
            size="md"
            className="border-0 bg-primary text-secondary shadow-sm hover:bg-primary/90"
          >
            View public site
          </Button>
        </Container>
      </Container>

      <HomePageSectionsPanel />
    </Container>
  );
}
