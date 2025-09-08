import { routePath } from "@constants/routePaths";
import {
  EditableText,
  ProblemNavigationButtons,
} from "@features";
import { problemStore } from "@features";
import { IconButton } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

export const ProblemNav = observer(() => {
  const navigate = useNavigate();
  const { currentProblem, setCurrentProblem, editProblem } =
    problemStore;

  const handleBackClick = () => {
    navigate(routePath.problems.root);
  };

  const handleEditTitle = async (value: string) => {
    if (value && currentProblem) {
      const newProblem = {
        ...currentProblem,
        title: value,
      };
      setCurrentProblem(newProblem);
      editProblem(newProblem);
    }
  };

  return (
    <>
      <div className={clsx(["flex", "space-x-2"])}>
        <IconButton icon="menu" />
        <IconButton icon="left" onClick={handleBackClick} />
      </div>
      {currentProblem ? (
        <>
          <div className="flex-1 max-w-md mx-4">
            <EditableText
              key={currentProblem.id}
              value={
                currentProblem?.title ?? "Problem title"
              }
              onSave={handleEditTitle}
            />
          </div>
          <ProblemNavigationButtons />
        </>
      ) : null}
    </>
  );
});
