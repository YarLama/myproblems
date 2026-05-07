import { Problem, problemStore } from "@entities";
import {
  EditableCategories,
  EditableCode,
  EditableDescription,
  EditableDifficulty,
  EditableTest,
  EditableText,
} from "@features";
import { LayoutGrid, LayoutItem } from "@ui";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const defaultProblem: Problem = {
  id: "",
  title: "New Problem",
  description: { en: "", ru: "" },
  difficulty: "easy",
  category: [],
  solution: {
    javascript: `/**
* The 'solution' function is the entry point for your code.
* 
* @param {...any} args — The arguments passed for each test case.
* @returns {any} — The result that will be compared with the expected output.
*/

function solution(...args) {

  //Your code goes here

  return null;
}
    `,
  },
  tests: { input: [[]], output: [] },
};

export const NewProblemPage = observer(() => {
  const {
    currentProblem,
    setCurrentProblem,
    editProblemField,
  } = problemStore;

  useEffect(() => {
    setCurrentProblem({ ...defaultProblem });

    return () => {
      setCurrentProblem(null);
    };
  }, []);

  if (!currentProblem) return null;

  return (
    <LayoutGrid className="py-8 m:py-0">
      <LayoutItem label="Name">
        <EditableText
          value={currentProblem.title}
          onTextChange={(value) =>
            editProblemField("title", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </LayoutItem>
      <LayoutItem label="Description">
        <EditableDescription
          value={currentProblem.description}
          onChange={(value) =>
            editProblemField("description", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </LayoutItem>
      <LayoutItem label="Difficulty">
        <EditableDifficulty
          value={currentProblem.difficulty}
          onDifficultyChange={(value) =>
            editProblemField("difficulty", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </LayoutItem>
      <LayoutItem label="Categories">
        <EditableCategories
          categories={currentProblem.category}
          onCategoriesChange={(cat) =>
            editProblemField("category", cat)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
          isHaveAutoFocus={false}
        />
      </LayoutItem>
      <LayoutItem label="Solution">
        <EditableCode
          solution={currentProblem.solution}
          onChangeCode={(value) =>
            editProblemField("solution", value)
          }
          isDebounced={true}
          isAutoSave={false}
        />
      </LayoutItem>
      <LayoutItem label="Tests">
        <EditableTest
          tests={currentProblem.tests}
          defaultEditingState={true}
          isHaveEditControls={false}
          isHaveAutoFocus={false}
          onChange={(value) =>
            editProblemField("tests", value)
          }
        />
      </LayoutItem>
    </LayoutGrid>
  );
});
