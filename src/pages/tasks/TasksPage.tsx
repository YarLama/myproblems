import { ScrollToTop, TaskCard } from "@ui";
import clsx from "clsx";

export const TasksPage = () => {

  return (
    <div className="flex flex-col">
      <div className={clsx([
        "flex",
        "flex-wrap",
        "justify-center"
      ])}>
        <TaskCard
          title="test1"
          description="testDescription"
          tags={["js", "ts", "array"]}
        />
        <TaskCard
          title="test1"
          description="testDescription"
          tags={["js", "ts", "array"]}
        />
        <TaskCard
          title="test1"
          description="ttestDescriptiontestDescriptiontestDescriptiontestDescriptiontestDescriptionestDescription"
          tags={["js", "ts", "array"]}
        />
        <TaskCard
          title="test1"
          description="testDescription"
          tags={["js", "ts", "array"]}
        />
        <TaskCard
          title="test1"
          description="testDescription"
          tags={["js", "ts", "array"]}
        />
        <TaskCard
          title="test1"
          description="testDescription"
          tags={["js", "ts", "array"]}
        />
        <TaskCard
          title="test1"
          description="testDescription"
          tags={["js", "ts", "array"]}
        />
      </div>
      <ScrollToTop thresholdY={200} />
    </div>
  );
}
