import { pistonAxios } from "@api";
import {
  PistonExecuteRequest,
  PistonExecuteResponse,
} from "./types";

export const executeCode = async (
  request: PistonExecuteRequest,
): Promise<PistonExecuteResponse> => {
  try {
    return await pistonAxios.post("/execute", request);
  } catch (e) {
    throw new Error(`Failed execute code: ${e}`);
  }
};
