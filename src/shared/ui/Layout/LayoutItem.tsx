import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface LayoutItemProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: "left" | "center" | "right";
  fullWidth?: boolean;
}

export const LayoutItem: React.FC<LayoutItemProps> = ({
  children,
  fullWidth = false,
  align = "center",
  className,
  ...props
}) => {
  const alignClasses = {
    left: "justify-self-start",
    center: "justify-self-center",
    right: "justify-self-end",
  };
  return (
    <div
      className={clsx(
        "flex flex-col",
        "w-full max-w-xl",
        "m:p-2",
        "[&>*]:w-full [&>*]:h-full",
        alignClasses[align],
        fullWidth ? "md:col-span-full" : "col-span-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
