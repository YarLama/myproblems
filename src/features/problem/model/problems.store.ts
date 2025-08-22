import { Problem, ProblemList } from "@types";
import { makeAutoObservable, runInAction } from "mobx";
import { createLocalDB } from "@lib";
import { v4 } from "uuid";
import { problemCategoriesStore } from "./problemCategories.store";

class ProblemStore {
  problemList: ProblemList = {
    version: 1,
    format: "list",
    data: [],
  };
  currentProblem: Problem | null = null;
  isInitialized = false;
  isLoading = false;
  isEditing = false;
  error: string | null = null;
  private db = createLocalDB();

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private getDefaultInfo = (): {
    version: number;
    format: "list";
  } => {
    return { version: 1, format: "list" };
  };

  private init = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const defaultInfo = this.getDefaultInfo();
      const [problemListInfo, problemListData] =
        await Promise.all([
          this.db.getProblemListInfo(),
          this.db.getAllProblems(),
        ]);

      if (!problemListInfo) {
        await this.db.setProblemListInfo({
          version: defaultInfo.version,
          format: defaultInfo.format,
        });
      }

      runInAction(() => {
        this.problemList = {
          version:
            problemListInfo.version ?? defaultInfo.version,
          format:
            problemListInfo.format ?? defaultInfo.format,
          data: problemListData ?? [],
        };
        if (problemListData) {
          this.isInitialized = true;
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  getPrevProblemId = (currentId: string): string => {
    const currentIndex = this.problemList.data.findIndex(
      (el) => el.id === currentId,
    );
    if (currentIndex < 1) return "";
    return this.problemList.data[currentIndex - 1].id;
  };

  getNextProblemId = (currentId: string): string => {
    const currentIndex = this.problemList.data.findIndex(
      (el) => el.id === currentId,
    );
    if (currentIndex + 1 >= this.problemList.data.length)
      return "";
    return this.problemList.data[currentIndex + 1].id;
  };

  getProblemTitle = (currentId: string): string => {
    const currentIndex = this.problemList.data.findIndex(
      (el) => el.id === currentId,
    );
    if (currentIndex < 0) return "";
    return this.problemList.data[currentIndex].title;
  };

  getProblem = (id: string): Problem | null => {
    const problem = this.problemList.data.find(
      (el) => el.id === id,
    );
    return problem ? problem : null;
  };

  addProblem = async (item: Problem) => {
    this.isEditing = true;

    const newProblem = {
      ...item,
      id: item.id ? item.id : v4(),
    };
    try {
      await this.db.addProblem(newProblem);
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error add";
      });
    }

    runInAction(() => {
      this.problemList.data.push(newProblem);
      problemCategoriesStore.updateCategories(
        [],
        item.category || [],
      );
      this.isEditing = false;
    });
  };

  editProblem = async (newItem: Problem) => {
    this.isEditing = true;
    const oldItem = this.getProblem(newItem.id);

    try {
      this.db.updateProblem(newItem).then(() => {
        const index = this.problemList.data.findIndex(
          (p) => p.id === newItem.id,
        );
        if (index !== -1) {
          runInAction(() => {
            this.problemList.data[index] = newItem;
            this.currentProblem = newItem;
          });
        }
      });
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error update";
      });
    }

    runInAction(() => {
      problemCategoriesStore.updateCategories(
        oldItem?.category || [],
        newItem.category || [],
      );
      this.isEditing = false;
    });
  };

  deleteProblem = async (id: string) => {
    this.isEditing = true;
    const problem = this.getProblem(id);

    try {
      this.db.deleteProblem(id).then(() => {
        runInAction(() => {
          this.problemList.data =
            this.problemList.data.filter(
              (p) => p.id !== id,
            );
        });
      });
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error delete";
      });
    }

    runInAction(() => {
      problemCategoriesStore.updateCategories(
        problem?.category || [],
        [],
      );
      this.isEditing = false;
    });
  };

  setCurrentProblem = (problem: Problem | null) => {
    if (problem) {
      runInAction(() => {
        this.currentProblem = problem;
      });
    }
  };
}

export const problemStore = new ProblemStore();
