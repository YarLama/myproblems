import { createLocalDB } from "@lib";
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

  useEffect(() => {
    if (id) {
      const data = db.current.getProblem(id);
      data.then((res) => {
        console.log("cli", res);
        if (res) {
          setProblem(res);
        } else {
          navigate(`/problems`);
        }
      });
    }
  }, [id, navigate, db]);

  console.log(id);

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
