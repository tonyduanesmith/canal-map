import { PointerEvent, useRef, useState } from "react";
import { StyledCard } from "./styled";

const SlideOver = () => {
  const pointerDownEvent = useRef<PointerEvent | null>(null);
  const initialPosition = useRef<null | number>(null);
  const [position, setPosition] = useState(800);
  const handleOnPointerDown = (event: PointerEvent) => {
    pointerDownEvent.current = event;
  };
  const handleOnPointerUp = (event: PointerEvent) => {
    pointerDownEvent.current = null;
  };
  const handleOnPointerMove = (event: PointerEvent) => {
    console.log(event.currentTarget.getBoundingClientRect().top);
    if (pointerDownEvent.current !== null) {
      const initialYPosition = pointerDownEvent.current.pageY;
      const newYPosition = event.pageY;
      const newSliderOverlayPosition = newYPosition;
      console.log({
        initialYPosition,
        newYPosition,
        newSliderOverlayPosition,
      });
      setPosition(newSliderOverlayPosition);
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
