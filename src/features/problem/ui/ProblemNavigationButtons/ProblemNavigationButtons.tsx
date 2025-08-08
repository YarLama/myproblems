import { routePath } from "@constants/routePaths";
import { problemStore } from "@features";
import { IconButton } from "@ui";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

export const ProblemNavigationButtons = observer(() => {
  const navigate = useNavigate();
  const {
    currentProblem,
    getNextProblemId,
    getPrevProblemId,
  } = problemStore;

  const nextId = getNextProblemId(currentProblem?.id ?? "");
  const prevId = getPrevProblemId(currentProblem?.id ?? "");

  const handleNavigateClick = (id: string) => {
    if (id) {
      navigate(routePath.problems.byId(id.trim()));
    }
  };

  return (
    <div className="flex space-x-2">
      <IconButton
        icon="left"
        disabled={!prevId}
        onClick={(_e) => handleNavigateClick(prevId)}
      />
      <IconButton
        icon="right"
        disabled={!nextId}
        onClick={(_e) => handleNavigateClick(nextId)}
      />
    </div>
  );
});
