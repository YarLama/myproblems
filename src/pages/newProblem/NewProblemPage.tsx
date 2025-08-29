import {
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
} from "@features";
import { observer } from "mobx-react-lite";

export const NewProblemPage = observer(() => {
  const defaultTitle: string = "";
  const defaultDescription: ProblemDescription = {
    en: "",
    ru: "",
  };
  const defaultCategories: string[] = [];
  const defaultSolution: ProblemSolution = {};
  const defaultTests: ProblemTests = {
    input: [],
    output: [],
  };

  return (
    <div>
      <div className="flex justify-center p-4">
        <EditableText
          key={`add-description`}
          label="Описание"
          value={defaultTitle}
          onChange={(value) =>
            console.log("description", value)
          }
        />
      </div>
      <div className="flex justify-center p-4">
        <EditableDescription
          key={`add-description`}
          label="Описание"
          value={defaultDescription}
          onChange={(value) =>
            console.log("description", value)
          }
        />
      </div>
      <div>
        <EditableCategories
          categories={defaultCategories}
          onCategoriesChange={(cat) =>
            console.log("category", cat)
          }
        />
      </div>
      <div>
        <EditableCode solution={defaultSolution} autoSave />
      </div>
      <div className="flex justify-center p-4">
        <EditableTest
          label="Тесты"
          key={`add-tests`}
          tests={defaultTests}
          onChange={(value) => console.log("tests", value)}
        />
      </div>
    </div>
  );
});
