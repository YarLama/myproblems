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

const sizeClasses: iconSizeClass = {
  sm: "px-1 text-md",
  md: "px-2 py-1 text-xl",
  lg: "px-3 py-2 text-2xl",
};

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
  return (
    <button
      {...props}
      className={clsx([
        btnClasses,
        hoverVariantClasses[hoverVariant],
        sizeClasses[size],
        className,
      ])}
    >
      <span className={clsx([Icons[icon].class])}>
        {Icons[icon].content}
      </span>
    </button>
  );
};
