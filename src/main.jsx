import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeInit } from "../.flowbite-react/init.js"; //
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeInit /> 
    <App />
  </React.StrictMode>
);
