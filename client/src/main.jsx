import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Root from "./components/Root";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
