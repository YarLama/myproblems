import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface LayoutGridProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({
  children,
  cols = 1,
  className,
  ...props
}) => {
  const gridCols = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-6 w-full",
        gridCols[cols],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
