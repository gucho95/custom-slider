import { RefObject, MouseEvent } from "react";
import { Breakpoint, Breakpoints, Positions } from "./types";

export const convertPixelToPercent = (offsetX: number, fullWidth: number) => {
  return (offsetX / fullWidth) * 100;
};

export const findOffsetXByValue = (value: number, breakpoints: Breakpoints) => {
  return breakpoints.find((bp) => bp.label === value)?.labelPositionInPercent;
};

export const calculateThumbPosition = (
  trackRef: RefObject<HTMLDivElement>,
  event: MouseEvent
) => {
  let thumbPosition;
  const trackRect = trackRef.current?.getBoundingClientRect();

  if (trackRect) {
    const trackRectWidth = trackRect.width;
    const offsetX = event.clientX - trackRect.left;
    const isValidRange = offsetX >= 0 && offsetX <= trackRectWidth;

    if (isValidRange) {
      thumbPosition = Math.round(
        (offsetX / (trackRect?.width as number)) * 100
      );
    }
  }

  return thumbPosition;
};

export const convertPositionsToBreakpoints = (
  positions: Positions,
  trackerWidth: number
): Breakpoints => {
  const breakpointsDelta = trackerWidth / (positions.length - 1);

  return positions.map((bp, index) => {
    const labelPositionInPixel = index * breakpointsDelta;

    const labelPositionInPercent = convertPixelToPercent(
      labelPositionInPixel,
      trackerWidth
    );

    switch (true) {
      case index === 0:
        return {
          label: bp,
          labelPositionInPercent,
          matchRange: [
            0,
            convertPixelToPercent(breakpointsDelta / 2, trackerWidth),
          ],
        } as Breakpoint;

      case index === positions.length - 1:
        return {
          label: bp,
          labelPositionInPercent: labelPositionInPercent,
          matchRange: [
            convertPixelToPercent(
              labelPositionInPixel - breakpointsDelta / 2,
              trackerWidth
            ),
            convertPixelToPercent(labelPositionInPixel, trackerWidth),
          ],
        } as Breakpoint;

      default:
        return {
          label: bp,
          labelPositionInPercent: labelPositionInPercent,
          matchRange: [
            convertPixelToPercent(
              labelPositionInPixel - breakpointsDelta / 2,
              trackerWidth
            ),
            convertPixelToPercent(
              labelPositionInPixel + breakpointsDelta / 2,
              trackerWidth
            ),
          ],
        } as Breakpoint;
    }
  });
};
