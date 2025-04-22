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

export type iconSizeClass = Partial<
  Record<iconSizes, string>
>;
export type iconHoverVariantClass = Partial<
  Record<iconHoverVariant, string>
>;
