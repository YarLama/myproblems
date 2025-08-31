import {
    Problem,
  ProblemDescription,
  ProblemSolution,
  ProblemTests,
} from "@entities";
import {
  EditableCategories,
  EditableCode,
  EditableDescription,
  EditableTest,
  EditableText,
  problemStore,
} from "@features";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const NewProblemPage = observer(() => {
  const { currentProblem, setCurrentProblem } = problemStore;
  const defaultTitle: string = "test title";
  const defaultDescription: ProblemDescription = {
    en: "",
    ru: "Test ru description",
  };
  const defaultCategories: string[] = ['test'];
  const defaultSolution: ProblemSolution = {'javascript': 'test code text'};
  const defaultTests: ProblemTests = {
    input: ['test'],
    output: ['test'],
  };

  const handleConfirm = () => {
    console.log({...currentProblem});
  }


  const saveData = <K extends keyof Problem>(
    field: K,
    value: Problem[K],
  ) => {
    if (!currentProblem) return;
    const defaultProblem: Problem = {
      id: "",
      title: defaultTitle,
      description: defaultDescription,
      difficulty: "easy",
      category: defaultCategories,
      solution: defaultSolution,
      tests: defaultTests,
    }
    const newProblem = {
      ...defaultProblem,
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
    }
    setCurrentProblem(defaultProblem);
  }, [])

  return currentProblem && (
    <div>
      <button onClick={handleConfirm}>TestConfirm</button>
      <div className="flex justify-center p-4">
        <EditableText
          key={`add-title`}
          label="title"
          value={currentProblem.title}
          onChange={(value) =>
            saveData("title", value)
          }
        />
      </div>
      <div className="flex justify-center p-4">
        <EditableDescription
          key={`add-description`}
          label="Описание"
          value={currentProblem.description}
          onChange={(value) =>
            console.log("description", value)
          }
          defaultEditingState={true}
          isHaveEditControls={false}
        />
      </div>
      <div>
        <EditableCategories
          categories={currentProblem.category}
          onCategoriesChange={(cat) =>
            console.log("category", cat)
          }
        />
      </div>
      <div>
        <EditableCode solution={currentProblem.solution} autoSave />
      </div>
      <div className="flex justify-center p-4">
        <EditableTest
          label="Тесты"
          key={`add-tests`}
          tests={currentProblem.tests}
          onChange={(value) => console.log("tests", value)}
        />
      </div>
    </div>
  );
});
