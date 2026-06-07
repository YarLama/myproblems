import {
  Problem,
  ProblemDifficulty,
  problemSortByType,
} from "@types";
import { autorun, makeAutoObservable } from "mobx";
import { problemStore } from "./problems.store";
import { LOCAL_STORAGE_SORT_KEY } from "@constants/localstorage";

type FilterType = {
  title: string;
  categories: string[];
  difficulty: ProblemDifficulty[];
  sortBy: problemSortByType;
  sortOrder: "asc" | "desc";
};

class ProblemFilter {
  filter: FilterType = {
    title: "",
    categories: [],
    difficulty: [],
    sortBy: "title",
    sortOrder: "desc",
  };

  constructor() {
    makeAutoObservable(this);
    this.loadSortingFromStorage();

    autorun(() => {
      const toSave = {
        sortBy: this.filter.sortBy,
        sortOrder: this.filter.sortOrder,
      };
      localStorage.setItem(
        LOCAL_STORAGE_SORT_KEY,
        JSON.stringify(toSave),
      );
    });
  }

  private loadSortingFromStorage() {
    try {
      const saved = localStorage.getItem(
        LOCAL_STORAGE_SORT_KEY,
      );
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sortBy)
          this.filter.sortBy = parsed.sortBy;
        if (parsed.sortOrder)
          this.filter.sortOrder = parsed.sortOrder;
      }
    } catch (e) {
      console.log("ProblemFilterStore error:", e);
    }
  }

  setTitle = (title: string) => {
    this.filter.title = title;
  };

  toogleCategory = (category: string) => {
    const index = this.filter.categories.indexOf(category);
    if (index === -1) {
      this.filter.categories.push(category);
    } else {
      this.filter.categories.splice(index, 1);
    }
  };

  toogleDifficulty = (difficulty: ProblemDifficulty) => {
    const index =
      this.filter.difficulty.indexOf(difficulty);
    if (index === -1) {
      this.filter.difficulty.push(difficulty);
    } else {
      this.filter.difficulty.splice(index, 1);
    }
  };

  setSorting(field: problemSortByType) {
    if (this.filter.sortBy === field) {
      this.filter.sortOrder =
        this.filter.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.filter.sortBy = field;
      this.filter.sortOrder = "desc";
    }
  }

  get isFilterEmpty(): boolean {
    return (
      this.filter.title === "" &&
      this.filter.difficulty.length === 0 &&
      this.filter.categories.length === 0
    );
  }

  resetFilter = () => {
    this.filter = {
      title: "",
      categories: [],
      difficulty: [],
      sortBy: "title",
      sortOrder: "desc",
    };
  };

  get filterCount(): number {
    const titleCount = this.filter.title !== "" ? 1 : 0;
    const categoryCount = this.filter.categories.length;
    const difficultyCount = this.filter.difficulty.length;
    const count =
      titleCount + categoryCount + difficultyCount;

    return count;
  }

  get filteredProblems(): Problem[] {
    const { data } = problemStore.problemList;
    let result = data;
    if (!this.isFilterEmpty) {
      result = data.filter((problem) => {
        const matchTitle = problem.title
          .toLowerCase()
          .includes(this.filter.title.toLowerCase());

        const matchCategories =
          this.filter.categories.length === 0 ||
          problem.category.some((cat) =>
            this.filter.categories.includes(cat),
          );

        const matchDifficulty =
          this.filter.difficulty.length === 0 ||
          this.filter.difficulty.includes(
            problem.difficulty,
          );

        return (
          matchTitle && matchCategories && matchDifficulty
        );
      });
    }

    const sortProblems = (
      problems: Problem[],
    ): Problem[] => {
      return [...problems].sort((a, b) => {
        const _a = a[this.filter.sortBy];
        const _b = b[this.filter.sortBy];

        if (
          typeof _a === "string" &&
          typeof _b === "string"
        ) {
          return this.filter.sortOrder === "asc"
            ? _a.localeCompare(_b, undefined, {
              numeric: true,
            })
            : _b.localeCompare(_a, undefined, {
              numeric: true,
            });
        }

        if (_a < _b)
          return this.filter.sortOrder === "asc" ? -1 : 1;
        if (_a < _b)
          return this.filter.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    };

    return sortProblems(result);
    // return result;
  }
}

export const problemFilterStore = new ProblemFilter();
