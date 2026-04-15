import { routePath } from "@constants/routePaths";
import {
  EditableText,
  MenuButton,
  ProblemNavigationButtons,
} from "@features";
import { problemStore } from "@entities";
import { IconButton } from "@ui";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { NavLayout } from "./NavLayout";

export const ProblemNav = observer(() => {
  const navigate = useNavigate();
  const { currentProblem, setCurrentProblem, editProblem } =
    problemStore;

  const handleBackClick = () => {
    navigate(routePath.problems.root);
  };

  const handleDeleteClick = () => {
    if (currentProblem) {
      if (window.confirm("Delete problem?")) {
        problemStore
          .deleteProblem(currentProblem.id)
          .then(() => {
            navigate(routePath.problems.root);
          });
      }
    }
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
    <NavLayout
      left={
        <>
          <MenuButton />
          <IconButton
            icon="left"
            onClick={handleBackClick}
          />
          <IconButton
            icon="delete"
            onClick={handleDeleteClick}
          />
        </>
      }
      center={
        currentProblem && (
          <>
            <EditableText
              key={currentProblem.id}
              value={
                currentProblem?.title ?? "Problem title"
              }
              onSave={handleEditTitle}
            />
          </>
        )
      }
      right={currentProblem && <ProblemNavigationButtons />}
    />
  );
});
