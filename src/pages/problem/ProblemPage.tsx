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
import { toJS } from "mobx";

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
        const outputString = result.stdout
          .map((res) => {
            if (res.status === "success") {
              if (res.testStatus === "success") {
                return `${res.testIndex}:${res.testStatus}. ${res.output}`;
              }
              if (res.testStatus === "failed") {
                return `${res.testIndex}:${res.testStatus}. Expected ${res.testExpected}, and return ${res.output}`;
              }
            }
            if (res.status === "error") {
              return `${res.testIndex}:error runtime: ${res.error}`;
            }
          })
          .join("\n");
        setOutput(outputString);

        if (result.stderr) {
          setOutput(result.stderr);
        }
      },
      onError: (error) => {
        setOutput(`Error: ${error.message}`);
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
    if (
      currentProblem &&
      currentProblem.tests.input &&
      currentProblem.tests.output &&
      code.trim()
    ) {
      execute({
        code: code,
        tests: toJS(currentProblem.tests),
      });
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
      <LayoutItem label="Description">
        <EditableDescription
          key={id}
          value={currentProblem.description}
          onChange={(value) =>
            saveData("description", value)
          }
        />
      </LayoutItem>
      <LayoutItem label="Categories">
        <EditableCategories
          categories={currentProblem.category}
          onCategoriesChange={(cat) =>
            saveData("category", cat)
          }
        />
      </LayoutItem>
      <LayoutItem label="Difficulty">
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
