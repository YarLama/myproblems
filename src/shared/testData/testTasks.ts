import { Problem, ProblemList } from "../types";

export const getTestTasks = () => {
  const test1: Problem<number, number> = {
    title: "test#1",
    description: {
      ru: "Описание на русском для test#1",
      en: "Description on english for test#1",
    },
    category: ["arrays"],
    difficulty: "easy",
    solution: [
      {
        language: "javascript",
        code: "console.log('test1')",
      },
    ],
    tests: {
      input: [1, 2],
      output: [1, 2],
    },
  };

  const test2: Problem<string, boolean> = {
    title: "test#2",
    description: {
      ru: "Описание на русском для test#2",
      en: "Description on english for test#2",
    },
    category: ["arrays"],
    difficulty: "medium",
    solution: [
      {
        language: "javascript",
        code: "console.log('test2')",
      },
    ],
    tests: {
      input: ["test", "test2"],
      output: [true, false],
    },
  };

  const test3: Problem<number, string> = {
    title: "test#3",
    description: {
      ru: "Описание на русском для test#3",
      en: "Description on english for test#3",
    },
    category: ["arrays"],
    difficulty: "hard",
    solution: [
      {
        language: "javascript",
        code: "console.log('test3')",
      },
    ],
    tests: {
      input: [1, 2, 3],
      output: ["123"],
    },
  };

  const data: Problem[] = [test1, test2, test3];
  return data;
};

export const getTestProblemsList = () => {
  const result: ProblemList = {
    version: 1,
    format: 'list',
    data: []
  }
  const test1: Problem<number, number> = {
    title: "test#1",
    description: {
      ru: "Описание на русском для test#1",
      en: "Description on english for test#1",
    },
    category: ["arrays"],
    difficulty: "easy",
    solution: [
      {
        language: "javascript",
        code: "console.log('test1')",
      },
    ],
    tests: {
      input: [1, 2],
      output: [1, 2],
    },
  };

  const test2: Problem<string, boolean> = {
    title: "test#2",
    description: {
      ru: "Описание на русском для test#2",
      en: "Description on english for test#2",
    },
    category: ["arrays"],
    difficulty: "medium",
    solution: [
      {
        language: "javascript",
        code: "console.log('test2')",
      },
    ],
    tests: {
      input: ["test", "test2"],
      output: [true, false],
    },
  };

  const test3: Problem<number, string> = {
    title: "test#3",
    description: {
      ru: "Описание на русском для test#3",
      en: "Description on english for test#3",
    },
    category: ["arrays"],
    difficulty: "hard",
    solution: [
      {
        language: "javascript",
        code: "console.log('test3')",
      },
    ],
    tests: {
      input: [1, 2, 3],
      output: ["123"],
    },
  };

  result.data = [test1, test2, test3];
  return result;
};
