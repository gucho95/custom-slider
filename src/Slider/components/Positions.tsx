import { FC, memo } from "react";
import classes from "../style.module.css";
import { Positions as PositionsType } from "../types";
import clsx from "clsx";

type PositionsPorps = {
  positions: PositionsType;
  className?: string;
  containerClassName?: string;
  breakpointClassName?: string;
};

const Positions: FC<PositionsPorps> = memo(
  ({ positions, containerClassName, breakpointClassName }) => {
    return (
      <div className={clsx(classes.sliderBreakpoints, containerClassName)}>
        {positions.map((item) => (
          <div
            key={item}
            className={clsx(classes.sliderBreakpoint, breakpointClassName)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
);

export default Positions;
