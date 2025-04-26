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

export type iconNames = keyof typeof Icons;
