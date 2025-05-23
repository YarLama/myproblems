import { problemStore } from "@model";
import { TaskCard } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";


export const ProblemList = observer(() => {

  const { problemList } = problemStore();

  return (
      <div className={clsx([
        "flex",
        "flex-wrap",
        "justify-center"
      ])}>
        {problemList?.data.map((p, i) => {
          return <TaskCard id={i} key={i} title={p.title} 
          description={p.description.ru}
          tags={p.category}
          />
        })}
      </div>
  )
});
