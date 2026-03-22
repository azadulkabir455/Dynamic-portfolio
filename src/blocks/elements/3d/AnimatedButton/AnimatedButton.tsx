"use client";

import Icon from "@/blocks/elements/icon/Icon";
import { cn } from "@/utilities/helpers/classMerge";
import { getSafeLink } from "./function";
import type { AnimatedButtonProps } from "./type";


const AnimatedButton = ({
  text,
  link,
  downloadFile,
  icon = "Sparkles",
  iconSize = 16,
  iconClassName,
  textClassName,
  className,
  dark = false,
  ...rest
}: AnimatedButtonProps) => {
  const href = getSafeLink(link);

  return (
    <a
      href={href}
      download={downloadFile}
      className={cn(
        "group cursor-target relative inline-flex items-center gap-4 overflow-hidden rounded-full",
        "border bg-transparent backdrop-blur-md px-2 py-3",
        "transition-all duration-300",
        dark
          ? "border-primary/30 hover:bg-primary/15"
          : "hover:bg-white/15",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "relative inline-flex h-11 w-11 overflow-hidden rounded-full",
          "animate-[iconDrift_2.2s_ease-in-out_infinite]",
          "items-center justify-center",
          dark
            ? "border border-primary/35 bg-primary/15"
            : "border border-white/20 bg-white/10",
        )}
      >
        <span
          className={cn(
            "absolute inset-0 inline-flex items-center justify-center",
            "transition-all duration-300 ease-[cubic-bezier(0,0,0,1)]",
            "translate-x-0 opacity-100 group-hover:-translate-x-full group-hover:opacity-0",
          )}
        >
          <Icon name={icon} size={iconSize} className={cn(iconClassName)} />
        </span>

        <span
          className={cn(
            "absolute inset-0 inline-flex items-center justify-center",
            "transition-all duration-300 ease-[cubic-bezier(0,0,0,1)]",
            "translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
          )}
        >
          <Icon name={icon} size={iconSize} className={cn(iconClassName)} />
        </span>
      </span>

      <span className="relative h-[1.1em] overflow-hidden leading-none">
        <span
          className={cn(
            "block uppercase tracking-wider",
            "transition-transform duration-300 ease-[cubic-bezier(0,0,0,1)] group-hover:-translate-y-full",
            textClassName,
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            "absolute left-0 top-full block uppercase tracking-wider",
            "transition-transform duration-300 ease-[cubic-bezier(0,0,0,1)] group-hover:-translate-y-full",
            textClassName,
          )}
        >
          {text}
        </span>
      </span>

      <style jsx>{`
        @keyframes iconDrift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </a>
  );
};

export default AnimatedButton;

