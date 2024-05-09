import React, { Component } from "react";

interface Position {
  x: number;
  y: number;
}

export interface DragItCoreProps {
  children: React.ReactNode;
  axis?: "x" | "y" | "both" | "none";
  handle?: string;
  defaultPosition?: Position;
  position?: Position | null;
  grid?: [number, number];
  scale?: number;
  buffer?: number;
}

interface DragItCoreState {
  position: {
    x: number;
    y: number;
  };
}

class DragItCore extends Component<DragItCoreProps, DragItCoreState> {
  draggableElement: HTMLElement | null = null;
  dragging: boolean = false;
  initialMousePos: { x: number; y: number } = { x: 0, y: 0 };
  handleElement: HTMLElement | null = null;

  constructor(props: DragItCoreProps) {
    super(props);
    this.state = {
      position: props.position || props.defaultPosition || { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    if (this.props.handle && this.draggableElement) {
      this.handleElement = this.draggableElement.querySelector(
        this.props.handle
      );
    }
  }

  handleMouseDown = (event: React.MouseEvent) => {
    // If there's a handle element and the event target is not the handle element, just return
    if (this.handleElement && event.target !== this.handleElement) return;

    // Start dragging and store the initial mouse position
    this.dragging = true;
    this.initialMousePos = { x: event.clientX, y: event.clientY };
  };

  handleMouseUp = (event: React.MouseEvent) => {
    // Stop dragging
    this.dragging = false;
  };

  handleMouseMove = (event: React.MouseEvent) => {
    // If not dragging, just return
    if (!this.dragging) return;

    const { axis, grid, scale = 1 } = this.props;

    // Calculate the new position based on the initial mouse position and the current mouse position
    let newPosition = { ...this.state.position };

    if (axis === "x" || axis === "both") {
      let deltaX = (event.clientX - this.initialMousePos.x) / scale;
      if (grid) {
        deltaX = Math.round(deltaX / grid[0]) * grid[0];
      }
      newPosition.x = this.state.position.x + deltaX;
    }

    if (axis === "y" || axis === "both") {
      let deltaY = (event.clientY - this.initialMousePos.y) / scale;
      if (grid) {
        deltaY = Math.round(deltaY / grid[1]) * grid[1];
      }
      newPosition.y = this.state.position.y + deltaY;
    }

    // Update the state with the new position
    this.setState({ position: newPosition });

    // Update the initial mouse position for the next mouse move event
    this.initialMousePos = { x: event.clientX, y: event.clientY };
  };

  render() {
    return (
      <div
        ref={(el) => (this.draggableElement = el)}
        style={{
          position: "absolute",
          left: this.state.position.x,
          top: this.state.position.y,
          padding: this.props.buffer || 0,
        }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseUp}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragItCore;
