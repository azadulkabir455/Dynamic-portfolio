export interface CountdownProps {
  days?: number;
  hours?: number;
  minutes?: number;
  containerClassName?: string;
  /** Class for the box wrapping each timer value (day, hour, minute, second) */
  unitBoxClassName?: string;
  timerClassName?: string;
  timerTextClassName?: string;
  dayLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  secondLabel?: string;
  [key: string]: any;
}
