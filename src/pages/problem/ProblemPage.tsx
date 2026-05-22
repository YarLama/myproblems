import { Problem } from "@entities";
import {
  EditableCategories,
  EditableCode,
  EditableDescription,
  EditableDifficulty,
  EditableTest,
  problemEditorStore,
  ProblemOutput,
} from "@features";
import { problemStore } from "@entities";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LayoutGrid, LayoutItem, Loader } from "@ui";
import { routePath } from "@constants/routePaths";
import { localDB } from "@lib";

export const ProblemPage = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useRef(useNavigate()).current;
  const { currentProblem, setCurrentProblem, editProblem } =
    problemStore;
  const { code } = problemEditorStore;

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
    editProblem(newProblem);
  };

  useEffect(() => {
    if (id) {
      const data = localDB.getProblem(id);
      data.then((res) => {
        if (res) {
          setCurrentProblem(res);
          setIsLoading(false);
        } else {
          navigate(routePath.problems.root);
        }
      });
    }

    return () => {
      setCurrentProblem(null);
    };
  }, [id]);

  if (!currentProblem || isLoading)
    return (
      <div className="mb-6 flex justify-center">
        <Loader />
      </div>
    );

  return (
    <LayoutGrid className="py-8 m:py-0">
      <LayoutItem label="Description">
        <EditableDescription
          key={id}
          value={currentProblem.description}
          onChange={(value) =>
            saveData("description", value)
          }
        />
      </LayoutItem>
      <LayoutItem label="Categories" collapsible defaultExpanded={false}>
        <EditableCategories
          categories={currentProblem.category}
          onCategoriesChange={(cat) =>
            saveData("category", cat)
          }
        />
      </LayoutItem>
      <LayoutItem label="Difficulty" collapsible defaultExpanded={false}>
        <EditableDifficulty
          value={currentProblem.difficulty}
        />
      </LayoutItem>
      <LayoutItem label="Solution">
        <EditableCode
          solution={currentProblem.solution}
          isAutoSave={true}
        />
      </LayoutItem>
      <LayoutItem label="Tests">
        <EditableTest
          tests={currentProblem.tests}
          onChange={(value) => saveData("tests", value)}
        />
      </LayoutItem>
      <LayoutItem label="Output">
        <ProblemOutput
          tests={currentProblem.tests}
          code={code}
        />
      </LayoutItem>
    </LayoutGrid>
  );
});
