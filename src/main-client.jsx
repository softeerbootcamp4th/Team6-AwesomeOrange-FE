import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <App />
  </StrictMode>,
);
