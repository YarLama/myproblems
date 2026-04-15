import { InputHTMLAttributes } from "react";

interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onInputChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onInputChange,
  ...props
}) => {
  return (
    <input
      type="text"
      name="search"
      className="px-4 py-2 border rounded-lg w-full bg-gray-300 border-gray-600"
      onChange={(e) => onInputChange(e.target.value)}
      {...props}
    />
  );
};
