import { useRef, useEffect, memo } from "react";
import { useSpring, config } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

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
  const sheetRef = useRef<HTMLDivElement>(null);

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: {
      ...config.default,
      tension: 400,
      friction: 30,
    },
  }));

  const getClosestSnapPoint = (currentPercentage: number) => {
    return snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - currentPercentage) < Math.abs(prev - currentPercentage) ? curr : prev;
    });
  };

  const bind = useGesture(
    {
      onDrag: ({ event, movement: [, my], memo = y.get() }) => {
        event.preventDefault();
        event.stopPropagation();
        if (disableGesture) return;

        const sheetHeight = sheetRef.current ? sheetRef.current.getBoundingClientRect().height - 80 : 0;
        const newY = Math.min(Math.max(0, memo + my), sheetHeight);
        api.start({ y: newY });
        return memo;
      },
      onDragEnd: ({ event, velocity: [, vy], direction: [, yDir], movement: [, my] }) => {
        event.preventDefault();
        event.stopPropagation();
        if (disableGesture) return;

        const sheetHeight = sheetRef.current ? sheetRef.current.getBoundingClientRect().height - 80 : 0;
        const currentY = y.get();
        const currentPercentage = sheetHeight ? (currentY / sheetHeight) * 100 : 0;
        const isVelocityHigh = Math.abs(vy) > 0.5;

        console.log("--- onDragEnd ---");
        console.log("currentY:", currentY);
        console.log("currentPercentage:", currentPercentage);
        console.log("vy:", vy);
        console.log("yDir:", yDir);
        console.log("isVelocityHigh:", isVelocityHigh);

        let nextSnapPoint = getClosestSnapPoint(currentPercentage);
        console.log("Closest snap point:", nextSnapPoint);

        if (isVelocityHigh) {
          const possibleSnapPoints =
            yDir > 0
              ? snapPoints.filter(sp => sp > currentPercentage)
              : snapPoints.filter(sp => sp < currentPercentage);
          if (possibleSnapPoints.length > 0) {
            nextSnapPoint = yDir > 0 ? Math.min(...possibleSnapPoints) : Math.max(...possibleSnapPoints);
          }
          console.log("Adjusted snap point based on velocity:", nextSnapPoint);
        }

        console.log("Setting y to:", (nextSnapPoint / 100) * sheetHeight);
        api.start({ y: (nextSnapPoint / 100) * sheetHeight });
        if (onSnapPointChange) {
          onSnapPointChange({ snapPoint: nextSnapPoint, forceUpdate: false });
        }
      },
    },
    {
      drag: {
        from: () => [0, y.get()],
        filterTaps: true,
        pointer: { touch: true },
      },
      eventOptions: { passive: false },
    },
  );

  useEffect(() => {
    const sheetHeight = sheetRef.current ? sheetRef.current.getBoundingClientRect().height - 80 : 0;
    api.start({ y: (snapPoints[1] / 100) * sheetHeight });
  }, [api, snapPoints]);

  useEffect(() => {
    if (!setSnapPoint.forceUpdate) {
      return;
    }
    const sheetHeight = sheetRef.current ? sheetRef.current.getBoundingClientRect().height - 80 : 0;
    api.start({ y: (setSnapPoint.snapPoint / 100) * sheetHeight });

    if (onSnapPointChange) {
      onSnapPointChange({ snapPoint: setSnapPoint.snapPoint, forceUpdate: false });
    }
  }, [setSnapPoint, api, onSnapPointChange]);

  return (
    <StyledSheet
      ref={sheetRef}
      {...bind()}
      style={{
        touchAction: "none",
        transform: y.to(value => `translate3d(0, ${value}px, 0)`),
      }}
    >
      <StyledHandle />
      {children}
    </StyledSheet>
  );
};

export default memo(BottomSheet);
