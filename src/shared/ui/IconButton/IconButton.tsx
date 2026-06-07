import clsx from "clsx";
import {
  iconHoverVariant,
  iconHoverVariantClass,
  iconSizeClass,
  iconSizes,
} from "./IconButton.types";
import { iconNames, Icons } from "@constants/icons";

const btnClasses = clsx([
  "flex",
  "border",
  "justify-center",
  ["bg-gray-300", "text-gray-600", "border-gray-600"],
  "rounded-lg",
  "cursor-pointer",
  "select-none",
]);

const hoverVariantClasses: iconHoverVariantClass = {
  default: clsx([
    "hover:bg-gray-600",
    "hover:text-gray-300",
    "hover:border-gray-300",
  ]),
  positive: clsx([
    ["hover:bg-green-300", "hover:text-gray-600"],
  ]),
  negative: clsx([
    ["hover:bg-red-300", "hover:text-gray-600"],
  ]),
};

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: iconNames;
  size?: iconSizes;
  hoverVariant?: iconHoverVariant;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "md",
  hoverVariant = "default",
  className,
  ...props
}) => {
  const isArrayContent = Array.isArray(Icons[icon].content);
  const arrayContentClasses =
    isArrayContent &&
    clsx(["items-center gap-0.5", "px-0"]);

  const sizeClasses: iconSizeClass = {
    sm: clsx([
      !isArrayContent ? "px-1" : "px-1",
      "text-md",
    ]),
    md: clsx([
      !isArrayContent ? "px-2" : "px-1",
      "py-1 text-xl",
    ]),
    lg: clsx([
      !isArrayContent ? "px-3" : "px-2",
      "py-2 text-2xl",
    ]),
  };
  return (
    <button
      {...props}
      name={icon}
      className={clsx([
        btnClasses,
        hoverVariantClasses[hoverVariant],
        sizeClasses[size],
        arrayContentClasses,
        className,
      ])}
    >
      {isArrayContent ? (
        (Icons[icon].content as readonly string[]).map(
          (el, i) => (
            <span
              key={i}
              className={clsx(
                [Icons[icon].class],
                i > 0 && "text-[0.5em]",
              )}
            >
              {el}
            </span>
          ),
        )
      ) : (
        <span className={clsx([Icons[icon].class])}>
          {Icons[icon].content}
        </span>
      )}
    </button>
  );
};
