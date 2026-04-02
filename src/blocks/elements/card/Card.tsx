import { cn } from "@/utilities/helpers/classMerge";
import { CardProps } from "./type";

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const Card = ({ children, className, padding = "md", ...props }: CardProps) => {
  return (
    <div
      className={cn(
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
