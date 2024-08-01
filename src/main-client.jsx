import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { register } from "swiper/element/bundle";
import App from "./App.jsx";
import "./index.css";

register();
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
