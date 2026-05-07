import clsx from "clsx";
import { useEffect, useState } from "react";
import { IconButton } from "../IconButton/IconButton";

export interface ScrollToTopProps {
  thresholdY?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  thresholdY = 80,
  containerRef,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const divClasses = clsx([
    containerRef ? "sticky ml-auto" : "fixed",
    "bottom-3 right-6 m:right-2",
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
    <div className={divClasses} onClick={doScrollToTop}>
      <IconButton size="sm" icon="up" />
    </div>
  );
};
