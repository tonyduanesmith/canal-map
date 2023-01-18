import { PointerEvent, useRef, useState } from "react";
import { StyledCard } from "./styled";

const SlideOver = () => {
  const pointerDownEvent = useRef<PointerEvent | null>(null);
  const initialSnapPosition = window.innerHeight * 0.9;
  const [position, setPosition] = useState<number>(initialSnapPosition);
  const handleOnPointerDown = (event: PointerEvent) => {
    pointerDownEvent.current = event;
  };
  const handleOnPointerUp = (event: PointerEvent) => {
    snapYPosition(position);
    pointerDownEvent.current = null;
  };

  const snapYPosition = (mouseY: number): void => {
    const snapPoints = [initialSnapPosition, window.innerHeight * 0.6, window.innerHeight * 0.05]

    let snappedYPosition = snapPoints[0];
    for (let i = 1; i < snapPoints.length; i++) {
      if (Math.abs(mouseY - snappedYPosition) > Math.abs(mouseY - snapPoints[i])) {
        snappedYPosition = snapPoints[i];
      }
    }
    setPosition(snappedYPosition)
  }

  const handleOnPointerMove = (event: PointerEvent) => {
    console.log(event.currentTarget.getBoundingClientRect().top);
    if (pointerDownEvent.current !== null) {
      setPosition(event.clientY);
    }
  };
  return (
    <StyledCard
      onPointerDown={handleOnPointerDown}
      onPointerUp={handleOnPointerUp}
      onPointerMove={handleOnPointerMove}
      position={position}
    />
  );
};

export default SlideOver;
