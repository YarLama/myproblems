import { createFileDB } from "./FileDB/adapter.ts";
import { createLocalDB } from "./LocalDB/adapter.ts";

export const localDB = createLocalDB();
export const fileDB = createFileDB();
