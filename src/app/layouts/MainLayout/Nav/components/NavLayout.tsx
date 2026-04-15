import { ReactNode } from "react";

interface NavLayoutProps {
  left?: ReactNode | ReactNode[];
  center?: ReactNode | ReactNode[];
  right?: ReactNode | ReactNode[];
}

export const NavLayout: React.FC<NavLayoutProps> = ({
  left,
  center,
  right,
}) => {
  return (
    <>
      <div className="flex items-center gap-2 px-4 m:order-1">
        {left}
      </div>
      <div className="flex justify-center items-center w-full mx-auto max-w-2xl m:max-w-md m:order-3 m:col-span-2 m:px-4 m:pt-1">
        {center}
      </div>
      <div className="flex justify-end items-center px-4 m:order-2">
        {right}
      </div>
    </>
  );
};
