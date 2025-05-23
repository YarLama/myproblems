import clsx from "clsx";
import { useNavigate } from "react-router";

interface TaskCardProps {
  id: number;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
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
  tags,
  clickable = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!clickable) return;
    navigate(`/problems/${id}`);
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
        ],
        ["w-48", "m-2", "cursor-pointer"],
      ])}
      data-id={id}
      onClick={handleClick}
    >
      {title && <h3>{title}</h3>}
      {description && (
        <p className={clsx(["truncate"])}>{description}</p>
      )}
      {tags?.length && (
        <div>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
};
