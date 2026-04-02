import { ListProps } from "./type";
import { cn } from "@/utilities/helpers/classMerge";

export const List = ({
  type = "ul",
  items = [],
  listClassName,
  itemClassName,
  listIcon,
  ...props
}: ListProps) => {
  const isOrdered = type === "ol";
  const Component = isOrdered ? "ol" : "ul";

  return (
    <Component
      className={cn(
        "space-y-2 pl-5 text-sm text-slate-700",
        isOrdered ? "list-decimal" : "list-disc",
        listIcon && "list-none pl-0",
        listClassName
      )}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={`list-item-${index}`}
          className={cn(
            itemClassName,
            listIcon && "flex flex-row items-center gap-2"
          )}
        >
          {listIcon && <span className="shrink-0" aria-hidden>{listIcon}</span>}
          <span>{item}</span>
        </li>
      ))}
    </Component>
  );
};

export default List;
