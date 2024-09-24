import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CustomizePage from "./pages/Login/CustomizePage";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Login/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileSetupPage from "./pages/Login/ProfileSetupPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/auth", // 카카오 리다이렉션 처리 페이지
                element: <Auth />,
            },
            {
                path: "/custom",
                element: <CustomizePage />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/profileSetup",
                element: <ProfileSetupPage />,
            },
        ],
        errorElement: <NotFound />,
    },
]);
