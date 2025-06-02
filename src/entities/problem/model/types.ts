import { AvailableLanguages } from "@constants/languages.ts";

export type ProblemDescription = Record<
  AvailableLanguages,
  string
>;
export type ProblemSolution = {
  language: string;
  code: string;
};

export type ProblemTests<T = unknown, U = unknown> = {
  input: T[];
  output: U[];
};

export type Problem<T = unknown, U = unknown> = {
  id: string;
  title: string;
  description: ProblemDescription;
  category: string[];
  difficulty: "easy" | "medium" | "hard";
  solution: ProblemSolution[];
  tests: ProblemTests<T, U>;
};

export type ProblemList = {
  version: number;
  format: "list";
  data: Problem[];
};
