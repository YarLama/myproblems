export const LocalDB = {
  dbName: "LocalDB",
  dbVersion: 1,
  dbProblemListInfoStore: "ProblemsInfo",
  dbProblemListStore: "Problems",
} as const;

export const FileDB = {
  dbName: "FileDB",
  dbVersion: 1,
  dbFileStore: "File",
  fileKey: "currentFileHandle",
} as const;
