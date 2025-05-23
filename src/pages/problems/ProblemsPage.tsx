import { ScrollToTop } from "@ui";
import { ProblemList } from "./ui/ProblemsList";

export const ProblemsPage = () => {

  return (
    <div className="flex flex-col">
      <ProblemList />
      <ScrollToTop thresholdY={200} />
    </div>
  );
};
