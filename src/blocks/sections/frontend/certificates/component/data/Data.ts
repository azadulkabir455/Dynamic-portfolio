import type { LogoLoopItem } from "@/blocks/elements/3d/LogoLoop/type";

export type ClientsData = {
  title: string;
  paragraph: string;
  logos: LogoLoopItem[];
};

export const clientsData: ClientsData = {
  title: "Trusted by Great Teams",
  paragraph:
    "Over the years I've had the privilege of collaborating with ambitious companies — from early-stage startups to established enterprises — building products that people actually use.",
  logos: [
    { src: "/images/logo/orangetoolz.png", alt: "Orangetoolz", title: "Orangetoolz" },
    { src: "/images/logo/sheba.avif",      alt: "Sheba.xyz",   title: "Sheba.xyz" },
    { src: "/images/logo/beshto.png",      alt: "Beshto",      title: "Beshto" },
    { src: "/images/logo/arla.png",        alt: "Arla",        title: "Arla" },
    { src: "/images/logo/beatnik.png",     alt: "Beatnik",     title: "Beatnik" },
    { src: "/images/logo/americanbestit.png", alt: "American Best IT", title: "American Best IT" },
    { src: "/images/logo/telnor.png",      alt: "Telnor",      title: "Telnor" },
    { src: "/images/logo/iovison.png",     alt: "Iovison",     title: "Iovison" },
    { src: "/images/logo/marico.avif",     alt: "Marico",      title: "Marico" },
    { src: "/images/logo/zam.avif",        alt: "Zam Zam",     title: "Zam Zam" },
  ],
};
