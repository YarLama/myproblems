import { getTestTasks } from "@root/src/shared/testData/testTasks";
import { Problem } from "@root/src/shared/types";
import { ScrollToTop, TaskCard } from "@ui";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const TasksPage = () => {

  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    const data = getTestTasks();
    setProblems(data);
  }, [])

  return (
    <div className="flex flex-col">
      <div className={clsx([
        "flex",
        "flex-wrap",
        "justify-center"
      ])}>
        {problems.map((p, i) => {
          return <TaskCard id={i} key={i} title={p.title} 
          description={p.description.ru}
          tags={p.category}
          />
        })}
      </div>
      <ScrollToTop thresholdY={200} />
    </div>
  );
}
