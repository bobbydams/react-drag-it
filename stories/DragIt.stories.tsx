import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DragIt from "../src/DragIt";

const meta: Meta = {
  title: "Example/DragIt",
  component: DragIt,
  argTypes: {
    axis: {
      control: { type: "select", options: ["x", "y", "both"] },
      description: "Determines which axis the draggable can move.",
    },
    position: {
      description: "Controlled position of the draggable component.",
    },
    defaultPosition: {
      description: "Default position of the draggable component.",
    },
    grid: {
      description:
        "Specifies the increments by which the draggable should move.",
    },
    scale: {
      description: "Scale factor for the draggable movement.",
    },
    buffer: {
      description:
        "Adds some draggable buffer space around the draggable component.",
    },
    onStart: {
      description: "Callback when dragging starts.",
    },
    onDrag: {
      description: "Callback when dragging.",
    },
    onStop: {
      description: "Callback when dragging stops.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const onStart = (event: React.MouseEvent, data: any) => {
  console.log("Start It!", data);
};

const onDrag = (event: React.MouseEvent, data: any) => {
  console.log("Drag It!", data);
};

const onStop = (event: React.MouseEvent, data: any) => {
  console.log("Stop It!", data);
};

export const Primary: Story = {
  args: {
    children: (
      <div style={{ backgroundColor: "purple" }}>
        <h2 style={{ color: "gold" }}>Drag Me!</h2>
      </div>
    ),
    axis: "both",
    onStart,
    onDrag,
    onStop,
  },
};

export const XAxisOnly: Story = {
  args: {
    children: (
      <div style={{ backgroundColor: "red" }}>
        <h2 style={{ color: "cyan" }}>Drag Me!</h2>
      </div>
    ),
    axis: "x",
    onStart,
    onDrag,
    onStop,
  },
};

export const YAxisOnly: Story = {
  args: {
    children: (
      <div style={{ backgroundColor: "blue" }}>
        <h2 style={{ color: "orange" }}>Drag Me!</h2>
      </div>
    ),
    axis: "y",
    onStart,
    onDrag,
    onStop,
  },
};

export const DefaultPosition: Story = {
  args: {
    children: (
      <div style={{ backgroundColor: "green" }}>
        <h2 style={{ color: "pink" }}>Drag Me!</h2>
      </div>
    ),
    axis: "both",
    defaultPosition: { x: 100, y: 100 },
    onStart,
    onDrag,
    onStop,
  },
};

export const WithGrid: Story = {
  args: {
    children: (
      <div
        style={{
          backgroundColor: "green",
          height: "150px",
          width: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "pink", padding: "20px" }}>Drag Me!</h2>
      </div>
    ),
    axis: "both",
    defaultPosition: { x: 0, y: 0 },
    buffer: 40,
    grid: [20, 20],
    onStart,
    onDrag,
    onStop,
  },
};

export const WithScale: Story = {
  args: {
    children: (
      <div
        style={{
          backgroundColor: "green",
          height: "150px",
          width: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "pink", padding: "20px" }}>Drag Me!</h2>
      </div>
    ),
    axis: "both",
    defaultPosition: { x: 0, y: 0 },
    buffer: 40,
    scale: 2,
    onStart,
    onDrag,
    onStop,
  },
};

export const WithATargetElement: Story = {
  args: {
    children: (
      <div
        style={{
          backgroundColor: "green",
          height: "250px",
          width: "250px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 className="dragMeOny" style={{ color: "pink", padding: "20px" }}>
          Drag Me!
        </h2>
        <h2 style={{ color: "pink", padding: "20px" }}>Not Me!</h2>
      </div>
    ),
    axis: "both",
    handle: ".dragMeOny",
    onStart,
    onDrag,
    onStop,
  },
};

export const WithABuffer: Story = {
  args: {
    children: (
      <div style={{ backgroundColor: "red" }}>
        <h2 style={{ color: "cyan" }}>Drag Me!</h2>
      </div>
    ),
    axis: "x",
    buffer: 50,
    onStart,
    onDrag,
    onStop,
  },
};
