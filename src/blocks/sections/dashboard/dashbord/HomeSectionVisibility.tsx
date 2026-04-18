"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Text from "@/blocks/elements/text/Text";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import {
  defaultHomeSectionVisibility,
  type HomeSectionKey,
  type HomeSectionVisibility,
  readHomeSectionVisibilityFromStorage,
  writeHomeSectionVisibilityToStorage,
} from "@/utilities/dashboard/homeSectionVisibility";
import { dashboardContentCardClass } from "@/blocks/sections/dashboard/layout/data";

const SECTION_ITEMS: { key: HomeSectionKey; label: string; imageSrc: string }[] = [
  { key: "hero", label: "Hero", imageSrc: "/images/azadulkabir.png" },
  { key: "portfolio", label: "Portfolio", imageSrc: "/images/portfolio/pf1.jpg" },
  { key: "company", label: "Company", imageSrc: "/images/Icons/companyBackground.png" },
  { key: "skills", label: "Skills", imageSrc: "/images/bg/skillBackground.jpg" },
];

const sectionCardClass =
  "flex w-full min-w-0 flex-col gap-3 rounded-lg border border-ternary/10 bg-secondary/25 p-4 shadow-[0_1px_6px_rgba(0,0,0,0.05)]";

function SectionToggle({
  checked,
  onCheckedChange,
  id,
  ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  id: string;
  ariaLabel: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border border-ternary/20 transition-colors duration-200",
        checked ? "bg-primary" : "bg-ternary/25",
      )}
    >
      <Container
        as="span"
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-secondary shadow-sm transition-transform duration-200 ease-out",
          checked && "translate-x-[1.375rem]",
        )}
      />
    </button>
  );
}

function SectionControlCard({
  sectionKey,
  label,
  imageSrc,
  checked,
  onCheckedChange,
}: {
  sectionKey: HomeSectionKey;
  label: string;
  imageSrc: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}) {
  const id = `section-${sectionKey}`;
  return (
    <Container className={sectionCardClass}>
      <Container className="flex w-full min-w-0 flex-row items-center justify-between gap-3">
        <Text variant="label" htmlFor={id} className="text-base font-bold text-ternary">
          {label}
        </Text>
        <SectionToggle
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          ariaLabel={`${label} section ${checked ? "on" : "off"}`}
        />
      </Container>
      <Container className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-ternary/10 bg-secondary/40">
        <Image
          src={imageSrc}
          alt={`${label} section preview`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </Container>
    </Container>
  );
}

export default function HomePageSectionsPanel() {
  const [visibility, setVisibility] = useState<HomeSectionVisibility>(defaultHomeSectionVisibility);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVisibility(readHomeSectionVisibilityFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeHomeSectionVisibilityToStorage(visibility);
  }, [visibility, hydrated]);

  const setSection = useCallback((key: HomeSectionKey, value: boolean) => {
    setVisibility((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <Container className={cn(dashboardContentCardClass, "p-6 md:p-8")}>
      <Text variant="h2" className="font-sans text-xl font-bold text-ternary">
        Home page sections
      </Text>
      <Text variant="p" className="mt-2 font-sans text-sm leading-relaxed text-text">
        Turn sections on or off for the public home page. Preferences are saved in this browser.
      </Text>
      <Container className="mt-6 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {SECTION_ITEMS.map(({ key, label, imageSrc }) => (
          <SectionControlCard
            key={key}
            sectionKey={key}
            label={label}
            imageSrc={imageSrc}
            checked={visibility[key]}
            onCheckedChange={(v) => setSection(key, v)}
          />
        ))}
      </Container>
    </Container>
  );
}
