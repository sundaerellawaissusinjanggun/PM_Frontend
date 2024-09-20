import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import GlobalStyles from "./styles/GlobalStyles.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GlobalStyles />
        <App />
    </StrictMode>
);
