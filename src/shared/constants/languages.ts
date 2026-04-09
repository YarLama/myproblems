export const ProgrammingLanguages = [
  "javascript"
] as const;

export const Languages = ["en", "ru"] as const;

export type AvailableLanguages =
  (typeof Languages)[number];

export type AvailableProgrammingLanguages =
  (typeof ProgrammingLanguages)[number];
