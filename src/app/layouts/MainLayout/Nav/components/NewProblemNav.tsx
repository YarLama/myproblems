import { routePath } from "@constants/routePaths";
import { MenuButton } from "@features";
import { IconButton } from "@ui";
import { useNavigate } from "react-router";
import { NavLayout } from "./NavLayout";
import { problemStore } from "@entities";

export const NewProblemNav = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(routePath.problems.root);
  };

  const handleConfirm = () => {
    const { currentProblem, addProblem } = problemStore;
    if (currentProblem)
      addProblem(currentProblem).then((problem) => {
        navigate(routePath.problems.byId(problem.id));
        window.scrollTo(0, 0);
      });
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
        </>
      }
      center={
        <div className="text-[var(--color-text)]">
          Add New Problem
        </div>
      }
      right={
        <IconButton icon="add" onClick={handleConfirm} />
      }
    />
  );
};
