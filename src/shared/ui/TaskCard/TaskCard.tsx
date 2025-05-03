import clsx from "clsx";

interface TaskCardProps {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  tags?: string[];
}

const sizeClasses: Partial<
  Record<NonNullable<TaskCardProps["size"]>, string>
> = {
  sm: clsx([]),
  md: clsx([]),
  lg: clsx([]),
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  size = "md",
  tags,
}) => {
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
    >
      {title && <h3>{title}</h3>}
      {description && (
        <p className={clsx(["truncate"])}>
          {description}
        </p>
      )}
      {tags?.length && (
        <div>
          {tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
};
