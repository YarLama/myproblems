import { AvailableProgrammingLanguages } from "@constants/languages";

export interface PistonExecuteRequest {
  language: AvailableProgrammingLanguages;
  version: string;
  files: {
    name?: string;
    content: string;
  }[];
  stdin?: string;
  args?: string[];
  compile_timeout?: number;
  run_timeout?: number;
  compile_memory_limit?: number;
  run_memory_limit?: number;
}

export interface PistonExecuteResponse {
  language: AvailableProgrammingLanguages;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
}

export interface PistonRuntime {
  language: AvailableProgrammingLanguages;
  version: string;
  aliases?: string[];
}

export type PistonRuntimesResponse = Record<AvailableProgrammingLanguages, PistonRuntime[]> 
