import "@testing-library/jest-dom";
// biome-ignore lint/performance/noNamespaceImport: Required for extending vitest matchers
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);
