import { ProblemList } from "@types";
import { makeAutoObservable, runInAction } from "mobx";
import { getTestProblemsList } from "../../testData/testTasks";
import { LocalDB, createLocalDB } from "@lib";

class ProblemStore {
  problemList: ProblemList | null = null;
  isLoading = true;
  error: string | null = null;
  private db = createLocalDB();

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    try {
      const data = await this.db.get<ProblemList>(
        LocalDB.dbStoreName,
      );

      // await new Promise(res => setTimeout(res, 3000))

      runInAction(() => {
        this.problemList = data || getTestProblemsList();
      });
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Error";
        this.problemList = getTestProblemsList();
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const problemStore = new ProblemStore();
