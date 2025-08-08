import { problemStore } from "@features";
import { Problem } from "@types";
import { IconButton, TaskCard } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

const testProblem: Problem<number, number> = {
  id: "",
  title: "test#1",
  description: {
    ru: "Описание на русском для test#1",
    en: "Description on english for test#1",
  },
  category: ["arrays"],
  difficulty: "easy",
  solution: {
    javascript: "console.log('test1')",
  },

  tests: {
    input: [1, 2],
    output: [1, 2],
  },
};

export const ProblemList = observer(() => {
  const { problemList, isLoading, addProblem } =
    problemStore;

  const handleAddClick = () => {
    addProblem(testProblem);
  };

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
          {Array.from(problemList.data).map((el) => {
            return (
              <TaskCard
                id={el.id}
                key={el.id}
                title={el.title}
                description={el.description.ru}
                tags={el.category}
              />
            );
          })}
          <IconButton
            icon="add"
            size="lg"
            onClick={handleAddClick}
          />
        </>
      )}
    </div>
  );
});
