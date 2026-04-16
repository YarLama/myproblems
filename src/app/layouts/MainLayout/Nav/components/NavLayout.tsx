import clsx from "clsx";
import { ReactNode } from "react";

interface NavLayoutProps {
  left?: ReactNode | ReactNode[];
  center?: ReactNode | ReactNode[];
  right?: ReactNode | ReactNode[];
}

const leftClasses = clsx([
  "flex items-center",
  "px-4",
  "gap-2 m:order-1",
]);
const centerClasses = clsx([
  "flex justify-center items-center",
  "m:max-w-3xs",
  "mx-auto m:px-4 m:pt-1",
  "m:order-3 m:col-span-2",
]);
const rightClasses = clsx([
  "flex justify-end items-center",
  "px-4",
  "m:order-2",
]);

export const NavLayout: React.FC<NavLayoutProps> = ({
  left,
  center,
  right,
}) => {
  return (
    <>
      <div className={leftClasses}>{left}</div>
      <div className={centerClasses}>{center}</div>
      <div className={rightClasses}>{right}</div>
    </>
  );
};
