import { FC, memo } from "react";
import classes from "../style.module.css";
import clsx from "clsx";

type ThumbProps = {
  isDragging: boolean;
  position: number;
  className?: string;
};

const Thumb: FC<ThumbProps> = memo(({ position, isDragging, className }) => {
  return (
    <div
      className={classes.sliderThumbWrapper}
      style={{ left: position + "%" }}
    >
      <span
        id="thumb"
        className={clsx(
          classes.sliderThumb,
          className,
          isDragging ? "scale-150" : ""
        )}
      ></span>
    </div>
  );
});

export default Thumb;
