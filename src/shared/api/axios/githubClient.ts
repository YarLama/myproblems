import axios from "axios";

export const githubRawClient = axios.create({
  baseURL: "https://raw.githubusercontent.com/YarLama/myproblems/master",
});
