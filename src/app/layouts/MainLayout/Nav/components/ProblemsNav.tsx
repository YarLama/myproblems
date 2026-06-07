import { routePath } from "@constants/routePaths";
import { problemStore } from "@entities";
import { MenuButton, Search, SearchSort } from "@features";
import { IconButton } from "@ui";
import { useNavigate } from "react-router";
import { NavLayout } from "./NavLayout";
import { observer } from "mobx-react-lite";

export const ProblemsNav = observer(() => {
  const navigate = useNavigate();
  const { getRandomProblemId, isProblemsEmpty } =
    problemStore;

  const handleAddClick = () => {
    navigate(routePath.problems.add);
  };

  const handleShuffleClick = () => {
    const randomId = getRandomProblemId();
    if (randomId) {
      navigate(routePath.problems.byId(randomId));
    }
  };

  return (
    <NavLayout
      left={
        <>
          <MenuButton />
          <IconButton icon="add" onClick={handleAddClick} />
        </>
      }
      center={
        isProblemsEmpty ? null : (
          <div className="flex gap-0.5">
            <Search />
            <SearchSort />
          </div>
        )
      }
      right={
        isProblemsEmpty ? null : (
          <>
            <IconButton
              icon="shuffle"
              onClick={handleShuffleClick}
            />
          </>
        )
      }
    />
  );
});
