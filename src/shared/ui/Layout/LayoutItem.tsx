import clsx from "clsx";
import { HTMLAttributes, ReactNode, useState } from "react";

interface LayoutItemProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: string;
  align?: "left" | "center" | "right";
  fullWidth?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const LayoutItem: React.FC<LayoutItemProps> = ({
  children,
  label,
  fullWidth = false,
  align = "center",
  className,
  collapsible = false,
  defaultExpanded = true,
  ...props
}) => {
  const [isExpanded, setIsExpanded] =
    useState(defaultExpanded);

  const alignClasses = {
    left: "self-start",
    center: "self-center",
    right: "self-end",
  };
  return (
    <div
      className={clsx(
        "flex flex-col",
        "w-full",
        "m:p-2",
        "[&>*]:w-full",
        alignClasses[align],
        fullWidth ? "md:col-span-full" : "col-span-1",
        className,
      )}
      {...props}
    >
      {label && (
        <div className="flex justify-between items-center text-gray-700 p-2">
          <span>{label}</span>
          {collapsible && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 p-1 hover:text-gray-300 transition-colors cursor-pointer rounded-sm focus:outline-none"
              aria-label={
                isExpanded ? "Collapse" : "Expand"
              }
            >
              <svg
                className={clsx(
                  "w-4 h-4 transform transition-transform duration-200",
                  !isExpanded ? "rotate-0" : "rotate-180",
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
          )}
        </div>
      )}
      {(!collapsible || isExpanded) && children}
    </div>
  );
};
