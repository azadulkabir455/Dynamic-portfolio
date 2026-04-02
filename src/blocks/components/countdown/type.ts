export interface CountdownProps {
  days?: number;
  hours?: number;
  minutes?: number;
  containerClassName?: string;
  unitBoxClassName?: string;
  timerClassName?: string;
  timerTextClassName?: string;
  dayLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  secondLabel?: string;
  [key: string]: any;
}
