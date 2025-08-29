const PROBLEMS_BASE = "/problems";
const ADD_BASE = "add";
const NOTFOUND_BASE = "*";

export const routePath = {
  root: "/",
  problems: {
    root: PROBLEMS_BASE,
    byIdTemplate: `${PROBLEMS_BASE}/:id`,
    byId: (id: string) => `${PROBLEMS_BASE}/${id}`,
    add: `${PROBLEMS_BASE}/${ADD_BASE}`
  },
  notFound: {
    root: NOTFOUND_BASE,
  },
} as const;
