import { Icons } from "@constants/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";

export interface ScrollToTopProps {
  thresholdY?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  thresholdY = 80,
  containerRef,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getDivClasses = () =>
    clsx([
      containerRef ? ["sticky ml-auto "] : "fixed",
      "bottom-3",
      "right-6",
      "flex",
      "items-center",
      "justify-center",
      "rounded-full",
      ["bg-gray-300", "text-gray-600", "border-gray-600"],
      "w-8",
      "h-8",
      "cursor-pointer",
    ]);

  const doScrollToTop = () => {
    const container = containerRef?.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef?.current || window;
    const isWindow = container === window;

    const handleScroll = () => {
      const scrollPosition = isWindow
        ? window.scrollY
        : (container as HTMLElement).scrollTop;
      setIsVisible(scrollPosition > thresholdY);
    };

    container.addEventListener("scroll", handleScroll);

    return () =>
      container.removeEventListener("scroll", handleScroll);
  }, [thresholdY, containerRef]);

  if (!isVisible) return null;

  return (
    <div
      className={getDivClasses()}
      onClick={doScrollToTop}
      role="button"
    >
      <span className={Icons.up.class}>
        {Icons.up.content}
      </span>
    </div>
  );
};
