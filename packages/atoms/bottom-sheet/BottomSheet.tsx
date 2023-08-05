import { useRef, useEffect, memo } from "react";
import { useSpring, config } from "@react-spring/web";
import { useGesture } from "react-use-gesture";

import { StyledSheet, StyledHandle } from "./styled";

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints: number[];
  setSnapPoint?: { snapPoint: number; forceUpdate: boolean };
  onSnapPointChange?: (newSnapPoint: { snapPoint: number; forceUpdate: boolean }) => void;
  disableGesture: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  snapPoints,
  setSnapPoint = { snapPoint: 50, forceUpdate: false },
  onSnapPointChange,
  disableGesture,
}) => {
  const skipGestureRef = useRef(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const [{ y }, setY] = useSpring(() => ({
    y: 0,
    config: {
      ...config.default,
      tension: 400,
      friction: 30,
    },
  }));

  const getClosestSnapPoint = (currentY: number) => {
    return snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev;
    });
  };

  const bind = useGesture(
    {
      onDrag: ({ event, movement: [, my], memo }) => {
        event.stopPropagation();
        if (skipGestureRef.current || disableGesture) {
          return;
        }
        const initialY = memo || y.get();
        const limitY = (7 / 100) * ((sheetRef.current?.offsetHeight || 0) - 80);
        if (initialY <= limitY && my < 0) {
          return;
        }

        setY({ y: initialY + my });
        return initialY;
      },
      onDragEnd: ({ event, velocity, movement: [, my] }) => {
        event.stopPropagation();
        if (skipGestureRef.current || disableGesture) {
          return;
        }
        const sheetHeight = (sheetRef.current?.offsetHeight || 0) - 80;
        const currentY = y.get();
        const currentPercentage = (currentY / sheetHeight) * 100;

        const targetPercentage = currentPercentage + (my / sheetHeight) * 100;
        const direction = my > 0 ? 1 : -1;
        const velocityThreshold = 0.1;
        const isMomentum = Math.abs(velocity) > velocityThreshold;

        const getNextSnapPoint = (snapPoints: number[], target: number, direction: number, isMomentum: boolean) => {
          if (isMomentum) {
            return direction > 0
              ? snapPoints.find(sp => sp > target)
              : snapPoints
                  .slice()
                  .reverse()
                  .find(sp => sp < target);
          } else {
            return snapPoints.reduce((prev, curr) => {
              return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
            });
          }
        };

        const nextSnapPoint =
          getNextSnapPoint(snapPoints, targetPercentage, direction, isMomentum) ||
          getClosestSnapPoint(targetPercentage);

        setY({ y: (nextSnapPoint / 100) * sheetHeight });
        // Reset the forceUpdate flag to avoid unwanted sheet movements.
        if (onSnapPointChange) {
          onSnapPointChange({ snapPoint: nextSnapPoint, forceUpdate: false });
        }
      },
    },
    { drag: { useTouch: true } },
  );

  useEffect(() => {
    if (!setSnapPoint.forceUpdate) {
      return;
    }

    skipGestureRef.current = true;
    const sheetHeight = (sheetRef.current?.offsetHeight || 0) - 80;

    setY({ y: (setSnapPoint.snapPoint / 100) * sheetHeight });

    setTimeout(() => {
      skipGestureRef.current = false;
    }, 300);

    // Reset the forceUpdate flag to avoid unwanted sheet movements.
    if (onSnapPointChange) {
      onSnapPointChange({ snapPoint: setSnapPoint.snapPoint, forceUpdate: false });
    }
  }, [setSnapPoint]);

  useEffect(() => {
    const sheetHeight = (sheetRef.current?.offsetHeight || 0) - 80; // Subtract 80 if required
    const initialY = (snapPoints[1] / 100) * sheetHeight; // Replace 0 with the desired snap point index
    setY({ y: initialY });
  }, [setY]);

  return (
    <StyledSheet
      ref={sheetRef}
      {...bind()}
      style={{
        transform: y.to(value => `translate3d(0, ${value}px, 0)`),
      }}
    >
      <StyledHandle />
      {children}
    </StyledSheet>
  );
};

export default memo(BottomSheet);
