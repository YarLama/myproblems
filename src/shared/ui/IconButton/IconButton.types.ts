export const IconsSizes = ["sm", "md", "lg"] as const;
export const IconsHoverVariant = [
  "default",
  "negative",
  "positive",
] as const;

export type iconSizes = (typeof IconsSizes)[number];
export type iconHoverVariant =
  (typeof IconsHoverVariant)[number];

export type iconSizeClass = Partial<
  Record<iconSizes, string>
>;
export type iconHoverVariantClass = Partial<
  Record<iconHoverVariant, string>
>;
