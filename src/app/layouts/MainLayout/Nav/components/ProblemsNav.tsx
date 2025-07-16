import { SearchFeature } from "@features";
import { IconButton } from "@ui";
import clsx from "clsx";

export const ProblemsNav = () => {
  return (
    <>
      <div className={clsx(["flex", "space-x-2"])}>
        <IconButton icon="menu" />
        <IconButton icon="add" />
      </div>
      <div className="flex-1 max-w-md mx-4">
        <SearchFeature />
      </div>
      <div className="flex space-x-2">
        <IconButton icon="shuffle" />
      </div>
    </>
  );
};
