import {
  problemFilterStore,
  problemStore,
} from "@entities";
import { IconButton, TaskCard } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

export const ProblemList = observer(() => {
  const { isLoading } = problemStore;
  const { filteredProblems } = problemFilterStore;

  return (
    <div
      className={clsx([
        "flex",
        "flex-wrap",
        "justify-center",
      ])}
    >
      {isLoading ? (
        <IconButton icon="menu" />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
});
