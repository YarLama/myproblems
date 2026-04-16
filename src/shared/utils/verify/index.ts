import { ProblemList } from "@types";

export const validateProblemList = (json: ProblemList) => {
  if (
    !json ||
    typeof json !== "object" ||
    Array.isArray(json)
  ) {
    return {
      isValid: false,
      error: "Файл должен содержать объект JSON",
    };
  }

  if (typeof json.version !== "number")
    return {
      isValid: false,
      error: 'Поле "version" должно быть числом',
    };
  if (json.format !== "list")
    return {
      isValid: false,
      error: 'Поле "format" должно иметь значение "list"',
    };
  if (!Array.isArray(json.data))
    return {
      isValid: false,
      error: 'Поле "data" должно быть массивом',
    };

  const usedIds = new Set<string>();
  for (let i = 0; i < json.data.length; i++) {
    const p = json.data[i];
    const prefix = `Problem[${i}]`;

    if (typeof p.id !== "string" || p.id.trim() === "")
      return {
        isValid: false,
        error: `${prefix}: "id" должен быть строкой`,
      };
    if (usedIds.has(p.id)) {
      return {
        isValid: false,
        error: `${prefix}: дубликат ID "${p.id}" найден в файле`,
      };
    }
    usedIds.add(p.id);
    if (typeof p.title !== "string")
      return {
        isValid: false,
        error: `${prefix}: "title" должен быть строкой`,
      };
    if (!Array.isArray(p.category))
      return {
        isValid: false,
        error: `${prefix}: "category" должен быть массивом строк`,
      };

    if (
      !p.description ||
      typeof p.description !== "object"
    ) {
      return {
        isValid: false,
        error: `${prefix}: "description" должен быть объектом`,
      };
    }

    if (!p.solution || typeof p.solution !== "object") {
      return {
        isValid: false,
        error: `${prefix}: "solution" должен быть объектом`,
      };
    }

    if (!p.tests || typeof p.tests !== "object") {
      return {
        isValid: false,
        error: `${prefix}: "tests" должен быть объектом`,
      };
    }
    if (
      !Array.isArray(p.tests.input) ||
      !Array.isArray(p.tests.output)
    ) {
      return {
        isValid: false,
        error: `${prefix}: "tests.input" и "tests.output" должны быть массивами`,
      };
    }
    if (p.tests.input.length !== p.tests.output.length) {
      return {
        isValid: false,
        error: `${prefix}: количество входных и выходных тестов не совпадает`,
      };
    }

    if (typeof p.difficulty !== "string") {
      return {
        isValid: false,
        error: `${prefix}: "difficulty" должен быть строкой`,
      };
    }
  }

  return { isValid: true };
};
