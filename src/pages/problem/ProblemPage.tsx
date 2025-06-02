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

  const handleDeleteClick = async () => {
    if (problem) {
      await problemStore.deleteProblem(problem.id);
      navigate('/problems')
    }
  }

  useEffect(() => {
    if (id) {
      const data = db.current.getProblem(id);
      data.then((res) => {
        if (res) {
          setProblem(res);
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
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};
