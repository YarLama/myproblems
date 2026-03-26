import { ReactNode } from "react";

interface SuggestionCategoryProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const SuggestionCategory = ({
  title,
  children,
  className = "",
}: SuggestionCategoryProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {title && (
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
          {title}
        </span>
      )}
      <div className="flex flex-wrap gap-1.5">
        {children}
      </div>
    </div>
  );
};
