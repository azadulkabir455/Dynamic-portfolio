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

/*
Import:
import List from "@/blocks/elements/list/List";

Props:
- type: "order" | "under" — ordered (ol) or unordered (ul)
- items: array of list items (children content)
- listClassName: classes for the list (ul/ol)
- itemClassName: classes for each li
- listIcon: custom icon/node shown before each item. Example: listIcon={<Icon name="Check" size={18} className="text-green-600" />} or listIcon={<span>◆</span>}
- ...props: extra native list attributes
*/
