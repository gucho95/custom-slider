import { FC, memo } from "react";
import classes from "../style.module.css";
import clsx from "clsx";

type TrackProps = {
  width: number;
  className?: string;
};

const Track: FC<TrackProps> = memo(({ width, className }) => {
  const right = `calc(100% - ${width}%)`;

  return (
    <div className={clsx(classes.sliderTrack, className)} style={{ right }} />
  );
});

export default Track;
