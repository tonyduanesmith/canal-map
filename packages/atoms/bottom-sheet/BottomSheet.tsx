import { useRef } from "react";
import { useSpring, config } from "@react-spring/web";
import { useGesture } from "react-use-gesture";

import { StyledSheet, StyledHandle } from "./styled";

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints: number[];
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, snapPoints }) => {
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
      onDrag: ({ movement: [, my], memo }) => {
        const initialY = memo || y.get();
        setY({ y: initialY + my });
        return initialY;
      },
      onDragEnd: ({ velocity, movement: [, my] }) => {
        const sheetHeight = sheetRef.current?.offsetHeight || 0;
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
      },
    },
    { drag: { useTouch: true } },
  );

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

export default BottomSheet;
