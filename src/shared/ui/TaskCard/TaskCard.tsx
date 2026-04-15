import { routePath } from "@constants/routePaths";
import { ProblemDifficulty } from "@types";
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

  const handleClick = () => {
    if (!clickable) return;
    navigate(routePath.problems.byId(id));
  };

  return (
    <article
      className={clsx([
        sizeClasses[size],
        [
          "bg-gray-600",
          "rounded-xl",
          "flex",
          "flex-col",
          "p-2",
          "overflow-hidden",
        ],
        ["w-48", "min-w-0", "m-2", "cursor-pointer"],
      ])}
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
      {difficulty && (
        <div className="flex flex-row flex-wrap gap-1 mt-2">
          <span className="block truncate max-w-full px-1 rounded bg-gray-900 text-xs opacity-60">
            {difficulty}
          </span>
        </div>
      )}
      <div className="flex flex-row flex-wrap gap-1 mt-2">
        {tags?.length ? (
          <>
            {tags.map((tag) => (
              <span
                key={tag}
                className="block truncate max-w-full px-1 rounded bg-gray-700 text-xs opacity-60"
              >
                {tag}
              </span>
            ))}
          </>
        ) : (
          <span className="block truncate max-w-full px-1 rounded bg-gray-700 text-xs opacity-60">
            no tags
          </span>
        )}
      </div>
    </article>
  );
};
