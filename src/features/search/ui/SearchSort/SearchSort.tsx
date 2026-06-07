import { iconNames } from "@constants/icons";
import { LOCAL_STORAGE_SORT_KEY } from "@constants/localstorage";
import { problemFilterStore } from "@entities";
import { problemSortByType } from "@types";
import { IconButton } from "@ui";
import { useState } from "react";

type iconVariantsType = [
  iconNames,
  problemSortByType,
  "asc" | "desc",
];
const iconVariants: iconVariantsType[] = [
  ["sort_title_asc", "title", "asc"],
  ["sort_title_desc", "title", "desc"],
];

export const SearchSort = () => {
  const [currVariant, setCurrVariant] = useState<number>(
    () => {
      try {
        const saved = localStorage.getItem(
          LOCAL_STORAGE_SORT_KEY,
        );
        if (saved) {
          const parsed = JSON.parse(saved);
          const foundIndex = iconVariants.findIndex(
            ([, sortBy, sortOrder]) =>
              sortBy === parsed.sortBy &&
              sortOrder === parsed.sortOrder,
          );
          if (foundIndex !== -1) return foundIndex;
        }
        return 0;
      } catch (e) {
        console.error("SearchSort error:", e);
        return 0;
      }
    },
  );

  const handleChageVariant = () => {
    if (iconVariants.length > 1) {
      if (currVariant + 1 === iconVariants.length) {
        setCurrVariant(0);
      } else {
        setCurrVariant(currVariant + 1);
      }
    }
    problemFilterStore.setSorting(
      iconVariants[currVariant][1],
    );
  };

  return (
    <IconButton
      icon={iconVariants[currVariant][0]}
      onClick={handleChageVariant}
    />
  );
};
