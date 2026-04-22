"use client";

import SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import SliderCard from "./element/card/Card";
import Arrow from "./element/arrow/Arrow";
import type { SkillSliderProps } from "./type";

import "slick-carousel/slick/slick.css";
import "./style.css";

const sliderSettings: Settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <Arrow direction="left" />,
  nextArrow: <Arrow direction="right" />,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function SkillSlider({ slides, className }: SkillSliderProps) {
  const list = slides;
  const shouldDuplicateSlides = list.length <= 3;
  const renderedSlides = shouldDuplicateSlides ? [...list, ...list] : list;

  return (
    <Container
      as="div"
      className={cn("skill-slider-root maxContainer", className)}
    >
      <SlickSlider {...sliderSettings}>
        {renderedSlides.map((slide, index) => (
          <Container
            as="div"
            key={`${slide.id}-${index}`}
          >
            <SliderCard slide={slide} />
          </Container>
        ))}
      </SlickSlider>
    </Container>
  );
}
