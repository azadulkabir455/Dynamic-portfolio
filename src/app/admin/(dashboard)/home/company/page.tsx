import Text from "@/blocks/elements/text/Text";
import Container from "@/blocks/elements/container/Container";
import { dashboardContentCardClass } from "@/blocks/sections/dashboard/layout/data";
import { cn } from "@/utilities/helpers/classMerge";

export default function AdminCompanyPage() {
  return (
    <Container className="flex w-full min-w-0 flex-col">
      <Container className={cn(dashboardContentCardClass, "p-6 md:p-8")}>
        <Text variant="h1" className="font-sans text-2xl font-bold text-ternary">
          Company
        </Text>
        <Text variant="p" className="mt-2 font-sans text-sm text-text">
          Company section editor will live here.
        </Text>
      </Container>
    </Container>
  );
}
