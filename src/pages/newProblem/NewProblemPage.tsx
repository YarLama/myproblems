import { Problem, problemStore } from "@entities";
import {
  EditableCategories,
  EditableCode,
  EditableDescription,
  EditableDifficulty,
  EditableTest,
  EditableText,
} from "@features";
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

  console.log(currentProblem);

  if (!currentProblem) return null;

  return (
    <div>
      <div className="flex justify-center p-4">
        <EditableText
          label="title"
          value={currentProblem.title}
          onTextChange={(value) =>
            editProblemField("title", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </div>
      <div className="flex justify-center p-4">
        <EditableDescription
          label="Description"
          value={currentProblem.description}
          onChange={(value) =>
            editProblemField("description", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </div>
      <div>
        <EditableDifficulty
          value={currentProblem.difficulty}
          onDifficultyChange={(value) =>
            editProblemField("difficulty", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </div>
      <div>
        <EditableCategories
          categories={currentProblem.category}
          onCategoriesChange={(cat) =>
            editProblemField("category", cat)
          }
        />
      </div>
      <div>
        <EditableCode
          solution={currentProblem.solution}
          onChangeCode={(value) =>
            editProblemField("solution", value)
          }
          isDebounced={true}
          isAutoSave={false}
        />
      </div>
      <div className="flex justify-center p-4">
        <EditableTest
          label="Тесты"
          tests={currentProblem.tests}
          onChange={(value) =>
            editProblemField("tests", value)
          }
        />
      </div>
    </div>
  );
});
