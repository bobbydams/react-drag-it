# React Drag It!

[![codecov](https://codecov.io/gh/bobbydams/react-drag-it/graph/badge.svg?token=QTESVVF16D)](https://codecov.io/gh/bobbydams/react-drag-it)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bobbydams/react-drag-it/build?logo=github)
[![npm version](https://badge.fury.io/js/%40bobbydams%2Freact-drag-it.svg)](https://badge.fury.io/js/%40bobbydams%2Freact-drag-it)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a TypeScript implementation of the [React Draggable](https://github.com/react-grid-layout/react-draggable) library.
It is designed to work with React 17 and higher and is compatible with both TypeScript and JavaScript projects.

## Features

- TypeScript support
- Compatible with React 17 and higher
- Includes a Storybook example

## Installation

To install this library, you can use npm:

```bash
npm install @bobbydams/react-drag-it
```

or yarn:

```bash
yarn add @bobbydams/react-drag-it
```

## Usage

Then, you can use it in your component:

```tsx
import React from "react";
import { DragIt } from "@bobbydams/react-drag-it";

<DragIt axis="both">
  <div>Your draggable content here</div>
</DragIt>;
```

## API

The DragIt component accepts the following props:

| Prop              | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| `axis`            | Determines which axis the draggable can move. Can be "x", "y", "both", or "none". |
| `buffer`          | Adds some draggable buffer space around the draggable component.                  |
| `handle`          | Selector to be used as the handle that initiates drag.                            |
| `defaultPosition` | The default position of the draggable component.                                  |
| `position`        | The controlled position of the draggable component.                               |
| `grid`            | Specifies the increments by which the draggable should move.                      |
| `scale`           | Scale factor for the draggable movement.                                          |
| `onStart`         | Callback when dragging starts.                                                    |
| `onDrag`          | Callback when dragging.                                                           |
| `onStop`          | Callback when dragging stops.                                                     |

## Examples

You can find examples of how to use the DragIt component in the `DragIt.stories.tsx` file.

## Development

To start the development server for Storybook, run:

```bash
yarn run storybook
```

## Testing

To run the tests for the DragIt component, run:

```bash
yarn test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
