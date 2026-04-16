import { githubRawClient } from "@api";
import { ProblemList } from "@types";
import { validateProblemList } from "@utils/verify";

export const fetchAndValidateProblems =
  async (): Promise<ProblemList> => {
    const responce = await githubRawClient.get<ProblemList>(
      "/problems/problems.json",
    );
    const data = responce.data;
    const validation = validateProblemList(data);
    if (!validation.isValid)
      throw new Error(validation.error);
    return data;
  };
