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
import { problemStore } from "@features";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const ProblemPage = observer(() => {
  const db = useRef(createLocalDB());
  const { id } = useParams();
  const navigate = useRef(useNavigate()).current;
  const { currentProblem, setCurrentProblem, editProblem } =
    problemStore;
  const { currentLanguage, code } = problemEditorStore;
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
      execute({
        language: currentLanguage,
        version: "*",
        files: [{ content: code }],
      });
    }
  };

  const handleDeleteClick = async () => {
    if (currentProblem) {
      await problemStore.deleteProblem(currentProblem.id);
      navigate("/problems");
    }
  };

  useEffect(() => {
    console.log('PAGE id', id)
    if (id) {
      const data = db.current.getProblem(id);
      data.then((res) => {
        if (res) {
          setCurrentProblem(res);
        } else {
          navigate(`/problems`);
        }
      });
    }
  }, [id, navigate, db, setCurrentProblem]);

  if (!currentProblem) return <div>Loader...</div>;

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
          onDifficultyChange={(v) => console.log('onChange', v)}
          onSave={(v) => console.log('onSave', v)}
        />
      </div>
      <div>
        <EditableCode
          solution={currentProblem.solution}
          autoSave
        />
      </div>
      <div className="flex justify-center p-4">
        <EditableTest
          label="Тесты"
          tests={currentProblem.tests}
          onChange={(value) => saveData('tests',value)}
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
