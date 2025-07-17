import { routePath } from "@constants/routePaths";
import { problemStore } from "@model";
import { IconButton } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const ProblemNav = observer(() => {
  const [prevId, setPrevId] = useState("");
  const [nextId, setNextId] = useState("");
  const [title, setTitle] = useState("Problem Title");
  const navigate = useNavigate();

  const {
    getPrevProblemId,
    getNextProblemId,
    getProblemTitle,
    isInitialized,
  } = problemStore;
  const { id } = useParams<{ id: string }>();

  const handleBackClick = () => {
    navigate(routePath.problems.root);
  };

  const handleNextProblemClick = (id: string) => {
    if (id) {
      navigate(routePath.problems.byId(id.trim()));
    }
  };

  useEffect(() => {
    if (isInitialized && id) {
      setPrevId(getPrevProblemId(id));
      setNextId(getNextProblemId(id));
      setTitle(getProblemTitle(id));
    }
  }, [
    isInitialized,
    id,
    title,
    getPrevProblemId,
    getNextProblemId,
    getProblemTitle,
  ]);

  return (
    <>
      <div className={clsx(["flex", "space-x-2"])}>
        <IconButton icon="menu" />
        <IconButton icon="left" onClick={handleBackClick} />
      </div>
      <div className="flex-1 max-w-md mx-4">{title}</div>
      <div className="flex space-x-2">
        <IconButton
          icon="left"
          onClick={(_e) => handleNextProblemClick(prevId)}
        />
        <IconButton
          icon="right"
          disabled={!nextId}
          onClick={(_e) => handleNextProblemClick(nextId)}
        />
      </div>
    </>
  );
});
