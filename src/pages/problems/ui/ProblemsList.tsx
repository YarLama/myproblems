import {
  problemFilterStore,
  problemStore,
} from "@entities";
import { Loader, TaskCard } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { ProblemsOnboarding } from "./ProblemsOnboarding";

export const ProblemList = observer(() => {
  const { isLoading } = problemStore;
  const { filteredProblems } = problemFilterStore;

  if (isLoading) {
    return <Loader />;
  }

  if (filteredProblems.length === 0) {
    return <ProblemsOnboarding />
  }

  return (
    <div
      className={clsx([
        "flex",
        "flex-wrap",
        "justify-center",
      ])}
    >
      {Array.from(filteredProblems).map((el) => {
        return (
          <TaskCard
            id={el.id}
            key={el.id}
            title={el.title}
            description={el.description.ru}
            tags={
              el.category.length > 0
                ? el.category
                : undefined
            }
          />
        );
      })}
    </div>
  );
});
