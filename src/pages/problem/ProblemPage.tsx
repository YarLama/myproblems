import { getTestTasks } from "@root/src/shared/testData/testTasks";
import { Problem } from "@types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const data = getTestTasks();
    if (id && (typeof id === 'string')) {
      setProblem(data[+id])
    }
  }, [id])
  
  if (!problem) return null;

  return (
    <div>
      <div>{problem.title}</div>
      <div>{problem.category}</div>
      <div>{problem.description.ru}</div>
      <div>{problem.solution[0].code}</div>
    </div>
  );
};
