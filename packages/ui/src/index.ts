// Import styles
import "./styles/globals.css";

// Components (server-safe)
// biome-ignore lint/performance/noBarrelFile: Intentional package public API exports
export * from "./components/text/text";

// Universal utils (can be used on client and server)
export * from "./lib/utils";
