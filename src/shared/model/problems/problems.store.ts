import { Problem, ProblemList } from "@types";
import { makeAutoObservable, runInAction } from "mobx";
import { createLocalDB } from "@lib";
import { v4 } from "uuid";

class ProblemStore {
  problemList: ProblemList = {
    version: 1,
    format: "list",
    data: [],
  };
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
          this.isInitialized = true
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
    if (currentIndex < 0) return ""
    return this.problemList.data[currentIndex].title;
  };

  addProblem = async (item: Problem) => {
    this.isEditing = true;

    const test = {
      ...item,
      id: v4(),
    };
    try {
      await this.db.addProblem(test);
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error add";
      });
    }

    runInAction(() => {
      this.problemList.data.push(test);
      this.isEditing = false;
    });
  };

  editProblem = async (newItem: Problem) => {
    this.isEditing = true;

    try {
      this.db.updateProblem(newItem).then(() => {
        const index = this.problemList.data.findIndex(
          (p) => p.id === newItem.id,
        );
        if (index !== -1) {
          this.problemList.data[index] = newItem;
        }
      });
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error update";
      });
    }

    runInAction(() => {
      this.isEditing = false;
    });
  };

  deleteProblem = async (id: string) => {
    this.isEditing = true;

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
      this.isEditing = false;
    });
  };
}

export const problemStore = new ProblemStore();
