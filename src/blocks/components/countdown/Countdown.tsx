"use client";

import clsx from "clsx";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { useCountdown } from "./function";
import type { CountdownProps } from "./type";

export const Countdown = (props: CountdownProps) => {
  const {
    days: initialDays = 0,
    hours: initialHours = 0,
    minutes: initialMinutes = 0,
    containerClassName,
    unitBoxClassName,
    timerClassName,
    timerTextClassName,
    dayLabel = "Days",
    hourLabel = "Hours",
    minuteLabel = "Minutes",
    secondLabel = "Seconds",
    ...rest
  } = props;

  const { days, hours, minutes, seconds } = useCountdown(
    initialDays,
    initialHours,
    initialMinutes
  );

  const units: Array<{ key: "day" | "hour" | "minute" | "second"; value: number; label: string }> = [
    { key: "day", value: days, label: dayLabel },
    { key: "hour", value: hours, label: hourLabel },
    { key: "minute", value: minutes, label: minuteLabel },
    { key: "second", value: seconds, label: secondLabel },
  ];

  return (
    <Container
      as="div"
      size="full"
      className={clsx("flex flex-wrap items-center justify-center gap-4 sm:gap-6 !max-w-none", containerClassName)}
      {...rest}
    >
      {units.map((unit) => (
        <Container
          key={unit.key}
          as="div"
          size="full"
          className="flex min-w-0 flex-col items-center justify-center gap-1.5 !max-w-none"
        >
          <Container
            as="div"
            size="full"
            className={clsx(
              "flex min-w-[3.5rem] flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 sm:min-w-[4rem] sm:px-4 sm:py-4",
              unitBoxClassName
            )}
          >
            <Text
              variant="span"
              className={clsx(
                "text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl",
                timerClassName
              )}
            >
              {String(unit.value).padStart(2, "0")}
            </Text>
          </Container>
          <Text
            variant="span"
            className={clsx("text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm", timerTextClassName)}
          >
            {unit.label}
          </Text>
        </Container>
      ))}
    </Container>
  );
};

export default Countdown;

/*
Import:
import Countdown from "@/blocks/componets/countdown/Countdown";

Props:
- days, hours, minutes: initial duration to count down from (numbers)
- containerClassName: extra classes for the outer container
- unitBoxClassName: extra classes for the box wrapping each timer value (default: bordered, rounded, bg)
- timerClassName: extra classes for all timer values (day, hour, minute, second numbers)
- timerTextClassName: extra classes for all timer labels
- dayLabel, hourLabel, minuteLabel, secondLabel: label text (default "Days", "Hours", "Minutes", "Seconds")
- ...props: extra native div attributes for the outer container
*/
