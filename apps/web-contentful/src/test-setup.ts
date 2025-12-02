// biome-ignore lint/performance/noNamespaceImport: Required for global React in JSX
import * as React from "react";
import "@testing-library/jest-dom";

// Make React available globally for JSX
globalThis.React = React;
