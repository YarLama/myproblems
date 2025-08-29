import { routePath } from "@constants/routePaths";
import { IconButton } from "@ui";
import clsx from "clsx";
import { useNavigate } from "react-router";

interface DefaultNavProps {
  title: string;
}

export const DefaultNav: React.FC<DefaultNavProps> = ({
  title,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(routePath.problems.root);
  };

  return (
    <>
      <div className={clsx(["flex", "space-x-2"])}>
        <IconButton icon="menu" />
        <IconButton icon="left" onClick={handleBackClick} />
      </div>
      <div className="flex-1 max-w-md mx-4">{title}</div>
    </>
  );
};
