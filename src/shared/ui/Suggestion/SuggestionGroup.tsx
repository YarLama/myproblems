import { ReactNode } from "react";

interface SuggestionGroupProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

export const SuggestionGroup = ({
  children,
  className = "",
  visible = true
}: SuggestionGroupProps) => {
  return visible && (
    <div
      role="listbox"
      className={`
        absolute top-full left-0 z-50 mt-1
        min-w-full w-max max-w-xs
        flex flex-col gap-4 p-3 rounded-lg border 
        bg-white border-slate-200 shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};
