import {
  problemFilterStore,
  problemStore,
} from "@entities";
import { Loader, TaskCard } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { ProblemsOnboarding } from "./ProblemsOnboarding";
import { ProblemsEmpty } from "./ProblemsEmpty";

export const ProblemList = observer(() => {
  const { isLoading } = problemStore;
  const { filteredProblems, isFilterEmpty } = problemFilterStore;

  if (isLoading) {
    return (
      <div className="mb-6 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (filteredProblems.length === 0 && isFilterEmpty) {
    return <ProblemsOnboarding />;
  }

  if (filteredProblems.length === 0 && !isFilterEmpty) {
    return <ProblemsEmpty />
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
            difficulty={el.difficulty}
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
