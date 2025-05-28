import { problemStore } from "@model";
import { Problem } from "@types";
import { IconButton, TaskCard } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

const testProblem: Problem<number, number> = {
  title: "test#1",
  description: {
    ru: "Описание на русском для test#1",
    en: "Description on english for test#1",
  },
  category: ["arrays"],
  difficulty: "easy",
  solution: [
    {
      language: "javascript",
      code: "console.log('test1')",
    },
  ],
  tests: {
    input: [1, 2],
    output: [1, 2],
  },
};

export const ProblemList = observer(() => {
  const { problemList, isLoading, addProblem } =
    problemStore;

  console.log(problemList?.data);
  console.log(Object.entries(problemList?.data));

  const handleAddClick = () => {
    console.log('click')
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
          {Object.entries(problemList.data).map(([i, p]) => {
            return (
              <TaskCard
                id={Number(i)}
                key={i}
                title={p.title}
                description={p.description.ru}
                tags={p.category}
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
