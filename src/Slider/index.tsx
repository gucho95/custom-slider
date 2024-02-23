import {
  FC,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./style.module.css";
import {
  convertPositionsToBreakpoints,
  calculateThumbPosition,
  findOffsetXByValue,
} from "./helpers";
import Rail from "./components/Rail";
import Thumb from "./components/Thumb";
import Positions from "./components/Positions";
import Track from "./components/Track";
import { Breakpoints, Positions as PositionsType } from "./types";

export type SliderProps = {
  positions: PositionsType;
  value: number;
  onChange?: (value: number) => void;
  classes?: {
    rail?: string;
    thumb?: string;
    track?: string;
    breakpointsContainer?: string;
    singleBreakpoint?: string;
  };
};

const Slider: FC<SliderProps> = memo(
  ({ positions, value, onChange, classes: sliderClasses }) => {
    const [, setActiveValue] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [breakpoints, setBreakpoints] = useState<Breakpoints>([]);

    const railRef = useRef<HTMLDivElement>(null);

    const handleActiveValueChange = useCallback(
      (value: number, cb?: (value: number) => void) => {
        const currentBreakpoint = breakpoints.find(
          (bp) => bp.matchRange[0] <= value && bp.matchRange[1] >= value
        );

        if (currentBreakpoint) {
          setActiveValue(currentBreakpoint.label);
          setOffsetX(currentBreakpoint.labelPositionInPercent);
          cb?.(currentBreakpoint.label);
        }
      },
      [breakpoints]
    );

    const handleMouseDown = useCallback((event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLDivElement;

      if (target.id === "thumb") {
        setIsDragging(true);
      }
    }, []);

    const handleMouseUp = useCallback(
      (event: MouseEvent) => {
        if (!isDragging) {
          return;
        }
        setIsDragging(false);
        const thumbPosition = calculateThumbPosition(railRef, event);

        if (thumbPosition !== undefined) {
          handleActiveValueChange(thumbPosition, onChange);
        }
      },
      [isDragging, setIsDragging, handleActiveValueChange, onChange]
    );

    const handleMouseLeave = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
      }
    }, [isDragging]);

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      const thumbPosition = calculateThumbPosition(railRef, event);

      if (thumbPosition !== undefined) {
        handleActiveValueChange(thumbPosition);
      }
    };

    // on value set/change calculate offsetX and set active value
    useEffect(() => {
      const isBreakpointsCalculated = !!breakpoints.length;

      if (!isBreakpointsCalculated || value === undefined) {
        return;
      }

      const isValidValueProvided = breakpoints.find((bp) => bp.label === value);

      if (!isValidValueProvided) {
        return;
      }

      const offsetX = findOffsetXByValue(value, breakpoints);

      if (offsetX !== undefined) {
        setOffsetX(offsetX);
        setActiveValue(value);
      }
    }, [breakpoints, value]);

    // convert positions to breakpoints
    useEffect(() => {
      const sliderWidth = railRef.current?.getBoundingClientRect()
        .width as number;

      const breakpoints = convertPositionsToBreakpoints(positions, sliderWidth);
      setBreakpoints(breakpoints);
    }, [positions]);

    // hide cursor on thumb move
    useEffect(() => {
      if (isDragging) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "default";
      }
    }, [isDragging]);

    return (
      <div
        className={classes.sliderContainer}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Rail
          ref={railRef}
          isDragging={isDragging}
          className={sliderClasses?.rail}
        >
          <Thumb
            position={offsetX}
            isDragging={isDragging}
            className={sliderClasses?.thumb}
          />
          <Track width={offsetX} className={sliderClasses?.track} />
        </Rail>
        <Positions
          positions={positions}
          containerClassName={sliderClasses?.breakpointsContainer}
          breakpointClassName={sliderClasses?.singleBreakpoint}
        />
      </div>
    );
  }
);

export default Slider;
