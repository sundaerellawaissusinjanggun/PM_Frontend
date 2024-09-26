import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CustomizePage from './pages/Login/CustomizePage';
import Login from './pages/login';
import NotFound from './pages/NotFound';
import Auth from './pages/Login/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileSetupPage from './pages/Login/ProfileSetupPage';
import MyPiggyBankPage from './pages/Profile/MyPiggyBankPage';
import MessageInputPage from './pages/Message/MessageInputPage';
import LikedMessagesPage from './pages/Profile/LikedMessagesPage';
import MessageShowPage from './pages/Message/MessageShowPage';
import MyMessageShowPage from './pages/Message/MyMessageShowPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/auth', // 카카오 리다이렉션 처리 페이지
        element: <Auth />,
      },
      {
        path: '/custom',
        element: <CustomizePage />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/profileSetup',
        element: <ProfileSetupPage />,
      },
      {
        path: '/myBank',
        element: <MyPiggyBankPage />,
      },
      {
        path: '/like',
        element: <LikedMessagesPage />,
      },
      {
        path: '/message',
        element: <MessageInputPage />,
      },
      {
        path: '/showMessage',
        element: <MessageShowPage />,
      },
      {
        path: '/myMessage',
        element: <MyMessageShowPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
