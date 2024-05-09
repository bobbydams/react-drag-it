import React, { useRef, useEffect, MouseEvent } from "react";
import DragItCore, { DragItCoreProps } from "./DragItCore";

interface DragItProps extends DragItCoreProps {
  onStart?: (event: React.MouseEvent, data: any) => void;
  onDrag?: (event: React.MouseEvent, data: any) => void;
  onStop?: (event: React.MouseEvent, data: any) => void;
}

const DragIt: React.FC<DragItProps> = ({
  children,
  onStart,
  onDrag,
  onStop,
  axis,
  handle,
  defaultPosition,
  position,
  grid,
  scale = 1,
  buffer,
}) => {
  const dragRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const draggableElement = dragRef.current;
    if (draggableElement) {
      draggableElement.addEventListener("mousedown", handleMouseDown as any);
    }

    return () => {
      if (draggableElement) {
        draggableElement.removeEventListener(
          "mousedown",
          handleMouseDown as any
        );
      }
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (handle && !target.matches(handle)) {
      return;
    }
    event.preventDefault();
    const initialMousePosition = { x: event.clientX, y: event.clientY };
    const initialElementPosition = defaultPosition || {
      x: dragRef.current ? dragRef.current.offsetLeft : 0,
      y: dragRef.current ? dragRef.current.offsetTop : 0,
    };
    let newElementPosition = initialElementPosition;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newMousePosition = { x: moveEvent.clientX, y: moveEvent.clientY };
      const delta = {
        x: (newMousePosition.x - initialMousePosition.x) / scale,
        y: (newMousePosition.y - initialMousePosition.y) / scale,
      };
      newElementPosition = {
        x:
          axis === "y"
            ? initialElementPosition.x
            : initialElementPosition.x + delta.x,
        y:
          axis === "x"
            ? initialElementPosition.y
            : initialElementPosition.y + delta.y,
      };

      // If grid is provided, adjust the position to the nearest grid step
      if (grid) {
        newElementPosition = {
          x: Math.round(newElementPosition.x / grid[0]) * grid[0],
          y: Math.round(newElementPosition.y / grid[1]) * grid[1],
        };
      }

      if (dragRef.current) {
        dragRef.current.style.left = `${newElementPosition.x}px`;
        if (axis !== "x") {
          dragRef.current.style.top = `${newElementPosition.y}px`;
        }
      }
      onDrag?.(moveEvent, {
        node: dragRef.current,
        position: newElementPosition,
      });
    };

    const handleMouseUp = (upEvent: React.MouseEvent<HTMLDivElement>) => {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseup", handleMouseUp as any);
      onStop?.(upEvent, {
        node: dragRef.current,
        position: newElementPosition,
      });
    };

    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("mouseup", handleMouseUp as any);
    // Call onStart and onDrag immediately to update the position
    onStart?.(event, {
      node: dragRef.current,
      position: initialElementPosition,
    });
    onDrag?.(event, {
      node: dragRef.current,
      position: initialElementPosition,
    });
  };

  return (
    <div ref={dragRef}>
      <DragItCore
        axis={axis}
        handle={handle}
        defaultPosition={defaultPosition}
        position={position}
        buffer={buffer}
        grid={grid}
        scale={scale}
      >
        {children}
      </DragItCore>
    </div>
  );
};

export default DragIt;
