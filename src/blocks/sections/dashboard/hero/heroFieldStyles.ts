import { cn } from "@/utilities/helpers/classMerge";

/** Dashboard hero editor — minimal: black border, transparent fill, small radius. */
export function heroFieldInput() {
  return cn(
    "rounded border border-black bg-transparent text-ternary",
    "text-sm outline-none transition-colors duration-200",
    "placeholder:text-text/55",
    "hover:border-black",
    "focus:border-black focus:ring-1 focus:ring-black/20 focus:ring-offset-0",
  );
}

export function heroFieldTextarea() {
  return cn(
    heroFieldInput(),
    "min-h-[104px] resize-y px-3 py-2.5 leading-relaxed",
  );
}

export function heroFieldLabel() {
  return cn("font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-ternary");
}

export function heroFieldIcon() {
  return cn("text-black");
}
