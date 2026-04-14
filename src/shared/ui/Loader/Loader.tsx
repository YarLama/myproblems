import { clsx } from "clsx";

const loaderClasses = clsx(
  "h-8 w-8",
  "animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
  "rounded-full border-4 border-solid border-current border-r-transparent",
  "align-[-0.125em]",
);

export const Loader = () => {
  return <div className={loaderClasses}></div>;
};
