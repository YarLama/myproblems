import { Problem, ProblemList } from "@types";
import { makeAutoObservable, runInAction } from "mobx";
import { createLocalDB } from "@lib";

class ProblemStore {
  problemList: ProblemList = {
    version: 1,
    format: "list",
    data: {},
  };
  isLoading = false;
  isEditing = false;
  error: string | null = null;
  private nextId = 1;
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

  private resetToDefault = () => {
    const defaultInfo = this.getDefaultInfo();
    this.problemList = {
      version: defaultInfo.version,
      format: defaultInfo.format,
      data: {},
    };
  };

  private init = async () => {
    try {
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

      if (problemListData) {
        console.log('keys', Object.keys(problemListData))
        const maxKey = Math.max(...Object.keys(problemListData).map(Number))
        console.log(maxKey)
      }

      console.log(problemListData);

      runInAction(() => {
        this.problemList = {
          version:
            problemListInfo.version || defaultInfo.version,
          format:
            problemListInfo.format || defaultInfo.format,
          data: problemListData || {},
        };
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addProblem = async (item: Problem) => {
    this.isEditing = true;
    try {
      await this.db.addProblem(item, this.nextId);
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error add";
      });
    }

    runInAction(() => {
      Object.assign(this.problemList.data, { [this.nextId]: item})
      this.isEditing = false;
      this.nextId++;
    });
  };

  async editProblem() {
    //find problem inner indexedDB first
    //find problem inner store second
    //replace old record in LocalDB
    //replace record in store
  }

  async deleteProblem() {
    //find problem inner indexedDB/store
    //delete record from indexedDB/store
  }
}

export const problemStore = new ProblemStore();
