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
  solution: {},
  tests: { input: [], output: [] },
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
    <LayoutGrid>
      <LayoutItem>
        <EditableText
          label="Problem Name"
          value={currentProblem.title}
          onTextChange={(value) =>
            editProblemField("title", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </LayoutItem>
      <LayoutItem>
        <EditableDescription
          label="Description"
          value={currentProblem.description}
          onChange={(value) =>
            editProblemField("description", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </LayoutItem>
      <LayoutItem>
        <EditableDifficulty
          value={currentProblem.difficulty}
          label="Difficulty"
          onDifficultyChange={(value) =>
            editProblemField("difficulty", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </LayoutItem>
      <LayoutItem>
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
      <LayoutItem>
        <EditableCode
          solution={currentProblem.solution}
          onChangeCode={(value) =>
            editProblemField("solution", value)
          }
          isDebounced={true}
          isAutoSave={false}
        />
      </LayoutItem>
      <LayoutItem className="flex justify-center p-4">
        <EditableTest
          label="Тесты"
          tests={currentProblem.tests}
          onChange={(value) =>
            editProblemField("tests", value)
          }
        />
      </LayoutItem>
    </LayoutGrid>
  );
});
