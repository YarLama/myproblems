import { Problem, useExecuteCode } from "@entities";
import {
  EditableCategories,
  EditableCode,
  EditableDescription,
  EditableDifficulty,
  EditableTest,
  problemEditorStore,
} from "@features";
import { createLocalDB } from "@lib";
import { problemStore } from "@entities";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Loader } from "@ui";

export const ProblemPage = observer(() => {
  const db = useRef(createLocalDB());
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
      navigate("/problems");
    }
  };

  useEffect(() => {
    if (id) {
      const data = db.current.getProblem(id);
      data.then((res) => {
        if (res) {
          setCurrentProblem(res);
          setIsLoading(false);
        } else {
          navigate(`/problems`);
        }
      });
    }
  }, [id, navigate, db, setCurrentProblem]);

  if (!currentProblem || isLoading)
    return <Loader />;

  return (
    <div>
      <div className="flex justify-center p-4">
        <EditableDescription
          key={id}
          label="Описание"
          value={currentProblem.description}
          onChange={(value) =>
            saveData("description", value)
          }
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
        <EditableDifficulty
          value={currentProblem.difficulty}
          onDifficultyChange={(v) =>
            console.log("onChange", v)
          }
          onSave={(v) => console.log("onSave", v)}
        />
      </div>
      <div>
        <EditableCode
          solution={currentProblem.solution}
          isAutoSave={true}
        />
      </div>
      <div className="flex justify-center p-4">
        <EditableTest
          label="Примеры"
          tests={currentProblem.tests}
          onChange={(value) => saveData("tests", value)}
        />
      </div>
      <div>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      <div>
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
      </div>
    </div>
  );
});
