import { Problem, useExecuteCode } from "@entities";
import {
  EditableCategories,
  EditableCode,
  EditableDescription,
  EditableDifficulty,
  EditableTest,
  problemEditorStore,
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
  const [output, setOutput] = useState<string>("");
  const { mutate: execute, isPending: isExecuting } =
    useExecuteCode({
      onSuccess: (result) => {
        setOutput(result.run.stdout);
        if (result.run.stderr) {
          setOutput(result.run.stderr);
        }
      },
      onError: (error) => {
        setOutput(`Error: ${error.message}`);
      },
      onSettled: () => {
        console.log("Execute code completed");
      },
    });

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

  const handleCheckClick = async () => {
    if (currentProblem && code.trim()) {
      execute(code);
    }
  };

  const handleDeleteClick = async () => {
    if (currentProblem) {
      await problemStore.deleteProblem(currentProblem.id);
      navigate(routePath.problems.root);
    }
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
    <LayoutGrid>
      <LayoutItem>
        <EditableDescription
          key={id}
          label="Описание"
          value={currentProblem.description}
          onChange={(value) =>
            saveData("description", value)
          }
        />
      </LayoutItem>
      <LayoutItem>
        <EditableCategories
          categories={currentProblem.category}
          onCategoriesChange={(cat) =>
            saveData("category", cat)
          }
        />
      </LayoutItem>
      <LayoutItem>
        <EditableDifficulty
          value={currentProblem.difficulty}
        />
      </LayoutItem>
      <LayoutItem>
        <EditableCode
          solution={currentProblem.solution}
          isAutoSave={true}
        />
      </LayoutItem>
      <LayoutItem>
        <EditableTest
          label="Примеры"
          tests={currentProblem.tests}
          onChange={(value) => saveData("tests", value)}
        />
      </LayoutItem>
      <LayoutItem>
        <button onClick={handleDeleteClick}>Delete</button>
      </LayoutItem>
      <LayoutItem>
        <h3>
          Output:
          {isExecuting ? (
            <p>Executing...</p>
          ) : (
            <>
              <pre>{output}</pre>
            </>
          )}
        </h3>
        <button onClick={handleCheckClick}>
          Send To Check
        </button>
      </LayoutItem>
    </LayoutGrid>
  );
});
