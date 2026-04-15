import { routePath } from "@constants/routePaths";
import { MenuButton } from "@features";
import { IconButton } from "@ui";
import { useNavigate } from "react-router";
import { NavLayout } from "./NavLayout";

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
      center={<div>{title}</div>}
    />
  );
};
