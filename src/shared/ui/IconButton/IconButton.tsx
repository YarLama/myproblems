import clsx from "clsx";

export const Icons = {
  menu: { content: "menu", class: "material-icons" },
  left: {
    content: "chevron_left",
    class: "material-icons",
  },
  right: {
    content: "chevron_right",
    class: "material-icons",
  },
  add: { content: "add", class: "material-icons" },
  delete: { content: "delete", class: "material-icons" },
  cancel: { content: "close", class: "material-icons" },
  shuffle: { content: "shuffle", class: "material-icons" },
  up: { content: "arrow_upward", class: "material-icons" },
  ok: { content: "check", class: "material-icons" },
  search: { content: "search", class: "material-icons" },
} as const;

export const IconsSizes = ["sm", "md", "lg"] as const;
export const IconsHoverVariant = [
  "default",
  "negative",
  "positive",
] as const;

export type iconNames = keyof typeof Icons;
export type iconSizes = (typeof IconsSizes)[number];
export type iconHoverVariant =
  (typeof IconsHoverVariant)[number];

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
  const sizeClasses = {
    sm: "p-1 text-lg",
    md: "px-2  text-xl",
    lg: "px-3 py-2 text-2xl",
  };

  const hoverVariantClasses = {
    default: clsx([
      "hover:bg-gray-600",
      "hover:text-gray-300",
      "hover:border-gray-300",
    ]),
    positive: clsx([
      [
        "hover:bg-green-300",
        "hover:text-gray-600",
        "hover:border-green-400",
      ],
    ]),
    negative: clsx([
      [
        "hover:bg-red-300",
        "hover:text-gray-600",
        "hover:border-red-400",
      ],
    ]),
  };

  return (
    <button
      {...props}
      className={clsx([
        "flex",
        "border",
        ["bg-gray-300", "text-gray-600", "border-gray-600"],
        "rounded-lg",
        "cursor-pointer",
        "select-none",
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
