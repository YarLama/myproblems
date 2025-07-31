import { routePath } from "@constants/routePaths";
import { ProblemNavigationButtons } from "@features";
import { problemStore } from "@model";
import { IconButton } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

export const ProblemNav = observer(() => {
  const navigate = useNavigate();
  const { currentProblem } = problemStore;

  const handleBackClick = () => {
    navigate(routePath.problems.root);
  };

  return (
    <>
      <div className={clsx(["flex", "space-x-2"])}>
        <IconButton icon="menu" />
        <IconButton icon="left" onClick={handleBackClick} />
      </div>
      <div className="flex-1 max-w-md mx-4">
        {currentProblem?.title ?? "Problem title"}
      </div>
      {currentProblem ? <ProblemNavigationButtons /> : null}
    </>
  );
});
