import { routePath } from "@constants/routePaths";
import { MenuButton, Search } from "@features";
import { IconButton } from "@ui";
import clsx from "clsx";
import { useNavigate } from "react-router";

export const ProblemsNav = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(routePath.problems.add);
  };

  return (
    <>
      <div className={clsx(["flex", "space-x-2"])}>
        <MenuButton />
        <IconButton icon="add" onClick={handleAddClick} />
      </div>
      <div className="flex-1 max-w-md mx-4">
        <Search />
      </div>
      <div className="flex space-x-2">
        <IconButton icon="shuffle" />
      </div>
    </>
  );
};
