import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DragIt from "./DragIt";

describe("DragIt component", () => {
  it("calls onStart when mouse down event is triggered", () => {
    const handleStart = jest.fn();
    const { getByText } = render(
      <DragIt onStart={handleStart}>
        <div>Drag me!</div>
      </DragIt>
    );

    fireEvent.mouseDown(getByText("Drag me!"));
    expect(handleStart).toHaveBeenCalled();
  });

  it("calls onStop when mouse up event is triggered", () => {
    const handleStop = jest.fn();
    const { getByText } = render(
      <DragIt onStop={handleStop}>
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    expect(handleStop).toHaveBeenCalled();
  });

  it("calls onDrag when mouse move event is triggered", () => {
    const handleDrag = jest.fn();
    const { getByText } = render(
      <DragIt onDrag={handleDrag}>
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(element);
    expect(handleDrag).toHaveBeenCalled();
  });

  it("restricts movement to the x-axis when axis prop is set to 'x'", () => {
    const handleDrag = jest.fn();
    const { getByText } = render(
      <DragIt onDrag={handleDrag} axis="x">
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    const initialPosition = handleDrag.mock.calls[0][1].position;

    fireEvent.mouseMove(element, { clientX: 100, clientY: 100 });
    const newPosition = handleDrag.mock.calls[1][1].position;

    expect(newPosition.y).toBe(initialPosition.y);
  });

  it("restricts movement to the x-axis when axis prop is set to 'y'", () => {
    const handleDrag = jest.fn();
    const { getByText } = render(
      <DragIt onDrag={handleDrag} axis="y">
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    const initialPosition = handleDrag.mock.calls[0][1].position;

    fireEvent.mouseMove(element, { clientX: 100, clientY: 100 });
    const newPosition = handleDrag.mock.calls[1][1].position;

    expect(newPosition.x).toBe(initialPosition.x);
  });

  it("starts at default position when defaultPosition prop is provided", () => {
    const handleStart = jest.fn();
    const defaultPosition = { x: 50, y: 50 };
    const { getByText } = render(
      <DragIt onStart={handleStart} defaultPosition={defaultPosition}>
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    const startPosition = handleStart.mock.calls[0][1].position;

    expect(startPosition).toEqual(defaultPosition);
  });

  it("moves in steps equal to the grid size when grid prop is provided", () => {
    const handleDrag = jest.fn();
    const gridSize: [number, number] = [20, 20];
    const { getByText } = render(
      <DragIt onDrag={handleDrag} grid={gridSize}>
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(element, { clientX: 35, clientY: 35 });
    const newPosition = handleDrag.mock.calls[1][1].position;

    expect(newPosition).toEqual({ x: 40, y: 40 });
  });

  it("takes into account the scale when moving the element", () => {
    const handleDrag = jest.fn();
    const scale = 2;
    const { getByText } = render(
      <DragIt onDrag={handleDrag} scale={scale}>
        <div>Drag me!</div>
      </DragIt>
    );

    const element = getByText("Drag me!");
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(element, { clientX: 50, clientY: 50 });
    const newPosition = handleDrag.mock.calls[1][1].position;

    expect(newPosition).toEqual({ x: 25, y: 25 });
  });

  it("only allows dragging from the handle when handle prop is provided", () => {
    const handleStart = jest.fn();
    const { getByText } = render(
      <DragIt onStart={handleStart} handle=".handle">
        <div>
          <div className="handle">Drag from here</div>
          <div>Don't drag from here</div>
        </div>
      </DragIt>
    );

    fireEvent.mouseDown(getByText("Don't drag from here"));
    expect(handleStart).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByText("Drag from here"));
    expect(handleStart).toHaveBeenCalled();
  });
});
