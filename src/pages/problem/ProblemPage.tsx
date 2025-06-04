import { ProblemSolution, useExecuteCode } from "@entities";
import { createLocalDB } from "@lib";
import { problemStore } from "@model";
import { Problem } from "@types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const ProblemPage = () => {
  const db = useRef(createLocalDB());
  const { id } = useParams();
  const navigate = useRef(useNavigate()).current;
  const [problem, setProblem] = useState<Problem | null>(
    null,
  );
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
    if (problem) {
      const newTestProblem: Problem<number, number> = {
        ...problem,
        title: "test#2",
        description: {
          ru: "Описание на русском для test#2",
          en: "Description on english for test#2",
        },
        category: ["trees"],
        difficulty: "hard",
        tests: {
          input: [3, 4],
          output: [9, 10],
        },
      };

      setProblem(newTestProblem);
      await problemStore.editProblem(newTestProblem);
    }
  };

  const handleCheckClick = async () => {
    if (problem && currentSolution) {
      execute({
        language: currentSolution.language,
        version: "*",
        files: [{ content: currentSolution.code }],
      });
    }
  };

  const handleDeleteClick = async () => {
    if (problem) {
      await problemStore.deleteProblem(problem.id);
      navigate("/problems");
    }
  };

  useEffect(() => {
    if (id) {
      const data = db.current.getProblem(id);
      data.then((res) => {
        if (res) {
          setProblem(res);
          if (res.solution.length) {
            setCurrentSolution(res.solution[0]);
          }
        } else {
          navigate(`/problems`);
        }
      });
    }
  }, [id, navigate, db]);

  if (!problem) return null;

  return (
    <div>
      <div>{problem.title}</div>
      <div>{problem.category}</div>
      <div>{problem.description.ru}</div>
      <div>{problem.solution[0].code}</div>
      <div>
        <button onClick={handleEditClick}>Edit</button>
      </div>
      <div>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      <div>
        <button onClick={handleCheckClick}>
          Send To Check
        </button>
      </div>
      <div>
        {isExecuting ? (
          <h3>Executing...</h3>
        ) : (
          <>
            <h3>Output:</h3>
            <pre>{output}</pre>
          </>
        )}
      </div>
    </div>
  );
};
