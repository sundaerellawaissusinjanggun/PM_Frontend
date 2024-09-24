import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GlobalStyles />
        <RouterProvider router={router} />
    </StrictMode>
);
