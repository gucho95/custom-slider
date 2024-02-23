import clsx from "clsx";
import { ReactNode, forwardRef, memo } from "react";
import classes from "../style.module.css";

type RailProps = {
  isDragging: boolean;
  children: ReactNode;
  className?: string;
};

const Rail = memo(
  forwardRef<HTMLDivElement, RailProps>(
    ({ isDragging, children, className }, ref) => {
      return (
        <div
          ref={ref}
          className={clsx(
            classes.sliderRail,
            className,
            isDragging ? "bg-opacity-70" : ""
          )}
        >
          {children}
        </div>
      );
    }
  )
);

export default Rail;
