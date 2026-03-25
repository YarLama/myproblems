import { Problem, ProblemDifficulty } from "@types";
import { makeAutoObservable } from "mobx";
import { problemStore } from "./problems.store";

type FilterType = {
  title: string;
  categories: string[];
  difficulty: ProblemDifficulty[];
};

class ProblemFilter {
  filter: FilterType = {
    title: "",
    categories: [],
    difficulty: [],
  };

  constructor() {
    makeAutoObservable(this);
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
    };
  };

  get filteredProblems(): Problem[] {
    const { data } = problemStore.problemList;

    if (this.isFilterEmpty) return data;

    const filteredProblems = data.filter((problem) => {
      const matchTitle = problem.title
        .toLowerCase()
        .includes(this.filter.title);

      const matchCategories =
        this.filter.categories.length === 0 ||
        problem.category.some((cat) =>
          this.filter.categories.includes(cat),
        );

      const matchDifficulty =
        this.filter.difficulty.length === 0 ||
        this.filter.difficulty.includes(problem.difficulty);

      return (
        matchTitle && matchCategories && matchDifficulty
      );
    });

    return filteredProblems;
  }
}

export const problemFilterStore = new ProblemFilter();
