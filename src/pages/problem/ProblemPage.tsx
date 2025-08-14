import { ProblemSolution, useExecuteCode } from "@entities";
import {
  EditableCode,
  EditableDescription,
  EditableTest,
  problemEditorStore,
} from "@features";
import { createLocalDB } from "@lib";
import { problemStore } from "@features";
import { Problem } from "@types";
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
  const [currentSolution, setCurrentSolution] =
    useState<ProblemSolution | null>(null);
  const { mutate: execute, isPending: isExecuting } =
    useExecuteCode({
      onSuccess: (result) => {
        setOutput(result.run.stdout);
        if (result.run.stderr) {
          console.error("Error: ", result.run.stderr);
        }
      },
      onError: (error) => {
        setOutput(`Error: ${error.message}`);
      },
      onSettled: () => {
        console.log("Execute code completed");
      },
    });

  const handleEditClick = async () => {
    if (currentProblem) {
      const newTestProblem: Problem<number, number> = {
        ...currentProblem,
        title: "test#2",
        description: {
          ru: "Описание на русском для test#2",
          en: "Description on english for test#2",
        },
        category: ["trees"],
        solution: {
          javascript: `\nfunction add(x,y) {\nreturn x + y;\n}\n\nconsole.log(add(5,4))`,
        },
        difficulty: "hard",
        tests: {
          input: [3, 4],
          output: [9, 10],
        },
      };

      setCurrentSolution(newTestProblem.solution);
      setCurrentProblem(newTestProblem);
      editProblem(newTestProblem);
    }
  };

  const handleCheckClick = async () => {
    if (currentProblem && currentSolution) {
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
            setCurrentProblem({
              ...currentProblem,
              description: value,
            })
          }
        />
      </div>
      <div>{currentProblem.category}</div>
      <div>
        <EditableCode solution={currentProblem.solution} />
      </div>
      <div>{`${currentProblem.tests.input} ${currentProblem.tests.output}`}</div>
      <div className="flex justify-center p-4">
        <EditableTest
          label="Тесты"
          key={`${id}-tests`}
          tests={currentProblem.tests}
          onChange={(value) => console.log(value)}
        />
      </div>

      <div>
        <button onClick={handleEditClick}>
          TestFullEdit
        </button>
      </div>
      <div>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      <div>
        <h3>Output: </h3>
        <button onClick={handleCheckClick}>
          Send To Check
        </button>
        <div>
          {isExecuting ? (
            <p>Executing...</p>
          ) : (
            <>
              <pre>{output}</pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
