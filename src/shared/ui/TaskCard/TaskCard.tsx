import { routePath } from "@constants/routePaths";
import { ProblemDifficulty } from "@types";
import { truncateText } from "@utils/text";
import clsx from "clsx";
import { useNavigate } from "react-router";

interface TaskCardProps {
  id: string;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  difficulty?: ProblemDifficulty;
  tags?: string[];
  clickable?: boolean;
}

const sizeClasses: Partial<
  Record<NonNullable<TaskCardProps["size"]>, string>
> = {
  sm: clsx([]),
  md: clsx([]),
  lg: clsx([]),
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  size = "md",
  difficulty,
  tags,
  clickable = true,
}) => {
  const navigate = useNavigate();
  const articleClasses = clsx([
    sizeClasses[size],
    [
      "bg-gray-600",
      "rounded-xl",
      "flex",
      "flex-col",
      "p-2",
      "overflow-hidden",
    ],
    ["w-48", "min-w-0", "max-h-40", "m-2", "cursor-pointer"],
  ]);

  const handleClick = () => {
    if (!clickable) return;
    navigate(routePath.problems.byId(id));
  };

  const renderDifficulty = (
    difficulty?: ProblemDifficulty,
  ) => {
    const spanClasses = clsx([
      "block truncate max-w-full",
      "bg-gray-900 opacity-60 rounded",
      "text-xs px-1",
    ]);

    if (difficulty) {
      return (
        <span className={spanClasses}>{difficulty}</span>
      );
    }
  };

  const renderTags = (tags?: string[]) => {
    const spanClasses = clsx([
      "block truncate max-w-full",
      "bg-gray-700 opacity-60 rounded",
      "text-xs px-1",
    ]);
    if (tags) {
      return tags.map((tag) => {
        return (
          <span key={tag} className={spanClasses}>
            {truncateText(tag, 10)}
          </span>
        );
      });
    } else {
      return <span className={spanClasses}>No Tags</span>;
    }
  };

  return (
    <article
      className={articleClasses}
      data-id={id}
      onClick={handleClick}
    >
      {title && (
        <h3 className="truncate max-w-full font-medium">
          {title}
        </h3>
      )}
      {description && (
        <p className={clsx(["truncate"])}>{description}</p>
      )}
      <div className="flex flex-row flex-wrap gap-1 mt-2 max-h-5">
        {renderDifficulty(difficulty)}
      </div>
      <div className="flex flex-row flex-wrap gap-1 mt-2 truncate">
        {renderTags(tags)}
      </div>
    </article>
  );
};
