import { routePath } from "@constants/routePaths";
import {
  Problem,
  ProblemDescription,
  ProblemSolution,
  problemStore,
  ProblemTests,
} from "@entities";
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
import { useNavigate } from "react-router";

export const NewProblemPage = observer(() => {
  const { currentProblem, setCurrentProblem, addProblem } =
    problemStore;
  const navigate = useNavigate();
  const defaultTitle: string = "test title";
  const defaultDescription: ProblemDescription = {
    en: "",
    ru: "Test ru description",
  };
  const defaultCategories: string[] = ["test"];
  const defaultSolution: ProblemSolution = {
    javascript: "test code text",
  };
  const defaultTests: ProblemTests = {
    input: ["test"],
    output: ["test"],
  };

  const handleConfirm = () => {
    if (currentProblem)
      addProblem(currentProblem).then((problem) => {
        navigate(routePath.problems.byId(problem.id));
        window.scrollTo(0, 0);
      });
  };

  const saveData = <K extends keyof Problem>(
    field: K,
    value: Problem[K],
  ) => {
    if (!currentProblem) return;
    const newProblem = {
      ...currentProblem,
      [field]: value,
    };

    setCurrentProblem(newProblem);
  };

  useEffect(() => {
    const defaultProblem: Problem = {
      id: "",
      title: defaultTitle,
      description: defaultDescription,
      difficulty: "easy",
      category: defaultCategories,
      solution: defaultSolution,
      tests: defaultTests,
    };
    setCurrentProblem(defaultProblem);
  }, []);

  return (
    currentProblem && (
      <div>
        <div className="flex justify-center p-4">
          <EditableText
            key={`add-title`}
            label="title"
            value={currentProblem.title}
            onTextChange={(value) =>
              saveData("title", value)
            }
            defaultEditingState={true}
            isHaveEditControls={false}
          />
        </div>
        <div className="flex justify-center p-4">
          <EditableDescription
            key={`add-description`}
            label="Описание"
            value={currentProblem.description}
            onChange={(value) =>
              saveData("description", value)
            }
            defaultEditingState={true}
            isHaveEditControls={false}
          />
        </div>
        <div>
          <EditableDifficulty
            value={currentProblem.difficulty}
            onDifficultyChange={(value) =>
              saveData("difficulty", value)
            }
            defaultEditingState={true}
            isHaveEditControls={false}
          />
        </div>
        <div>
          <EditableCategories
            categories={currentProblem.category}
            onCategoriesChange={(cat) =>
              saveData("category", cat)
            }
          />
        </div>
        <div>
          <EditableCode
            solution={currentProblem.solution}
            onChangeCode={(value) =>
              saveData("solution", value)
            }
            isDebounced={true}
            isAutoSave={false}
          />
        </div>
        <div className="flex justify-center p-4">
          <EditableTest
            label="Тесты"
            key={`add-tests`}
            tests={currentProblem.tests}
            onChange={(value) => saveData("tests", value)}
          />
        </div>
        <div>
          <button
            className="border border-gray-300 rounded-lg p-2"
            onClick={handleConfirm}
          >
            Add problem
          </button>
        </div>
      </div>
    )
  );
});
