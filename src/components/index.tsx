import { createRoot } from "react-dom/client";
import { App } from "./App/App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root is not defined");
}
const container = createRoot(root);
container.render(<App />);
