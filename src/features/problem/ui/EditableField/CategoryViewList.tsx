interface CategoryViewListProps {
  categories: string[];
}

export const CategoryViewList: React.FC<
  CategoryViewListProps
> = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full text-sm font-medium"
        >
          {category}
        </span>
      ))}
      {categories.length === 0 && (
        <p className="text-gray-500 text-sm">
          Без категорий
        </p>
      )}
    </div>
  );
};
