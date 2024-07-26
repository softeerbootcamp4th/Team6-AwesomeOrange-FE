import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const $root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.env.DEV) {
  const root = createRoot($root);
  root.render(app);
} else {
  hydrateRoot($root, app);
}
