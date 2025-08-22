import { Problem } from "@entities";
import { createLocalDB } from "@lib";
import { makeAutoObservable, runInAction } from "mobx";

class ProblemCategories {
  private categories: Map<string, number> = new Map();
  isInitialized = false;
  isLoading = false;
  private db = createLocalDB();

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const allProblems = await this.db.getAllProblems();
      this.calculateAllCategories(allProblems);

      runInAction(() => {
        this.isInitialized = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error(e);
    }
  };

  private calculateAllCategories = (
    problems: Problem[],
  ) => {
    const newCategories = new Map<string, number>();

    problems.forEach((problem) => {
      problem.category?.forEach((category) => {
        const normalizedCategory = category.trim();
        if (normalizedCategory) {
          newCategories.set(
            normalizedCategory,
            (newCategories.get(normalizedCategory) || 0) +
              1,
          );
        }
      });
    });

    this.categories = newCategories;
  };

  incrementCategory = (category: string) => {
    const normalizedCategory = category.trim();
    if (!normalizedCategory) return;

    const currentCount =
      this.categories.get(normalizedCategory) || 0;
    this.categories.set(
      normalizedCategory,
      currentCount + 1,
    );
  };

  decrementCategory = (category: string) => {
    const normalizedCategory = category.trim();
    if (!normalizedCategory) return;

    const currentCount =
      this.categories.get(normalizedCategory) || 0;
    const newCount = currentCount - 1;

    if (newCount <= 0) {
      this.categories.delete(normalizedCategory);
    } else {
      this.categories.set(normalizedCategory, newCount);
    }
  };

  updateCategories = (
    oldCategories: string[],
    newCategories: string[],
  ) => {
    oldCategories.forEach((cat) => {
      this.decrementCategory(cat);
    });

    newCategories.forEach((cat) => {
      this.incrementCategory(cat);
    });
  };
}

export const problemCategoriesStore =
  new ProblemCategories();
