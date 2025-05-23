import { Problem, ProblemList } from "@types";
import { makeAutoObservable } from "mobx";
import { getTestProblemsList } from "../../testData/testTasks";

interface ProblemStore {
  problemList: ProblemList | null;
  currentProblem: Problem | null;
  isLoading: boolean;
  error: string | null;
  addProblem: () => void;
  updateProblem: () => void;
  deleteProblem: () => void;
  setCurrentProblem: () => void;
}

export const createProblemStore = (): ProblemStore => {
  let problemList: ProblemList | null = null;
  const currentProblem: Problem | null = null;
  let isLoading: boolean = false;
  const error: string | null = null;

  const initProblems = async () => {
    isLoading = true;
    const data = getTestProblemsList();
    problemList = data;
    isLoading = false;
  };

  initProblems();

  return makeAutoObservable({
    get problemList() {
      return problemList;
    },
    get currentProblem() {
      return currentProblem;
    },
    get isLoading() {
      return isLoading;
    },
    get error() {
      return error;
    },

    addProblem() { },
    updateProblem() { },
    deleteProblem() { },
    setCurrentProblem() { },
  });
};
