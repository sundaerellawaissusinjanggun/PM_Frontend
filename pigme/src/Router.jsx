import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CustomizePage from './pages/Login/CustomizePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileSetupPage from './pages/Login/ProfileSetupPage';
// import MyPiggyBankPage from './pages/Profile/MyPiggyBankPage';
import MessageInputPage from './pages/Message/MessageInputPage';
import LikedMessagesPage from './pages/Profile/LikedMessagesPage';
import MessageShowPage from './pages/Message/MessageShowPage';
import MyMessageShowPage from './pages/Message/MyMessageShowPage';
import FollowPage from './pages/Friend/FollowPage';
import FollowListPage from './pages/Friend/FollowListPage';
import MyPiggyBankPage from './pages/Profile/MyPiggyBankPage';
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
      {
        path: '/friend',
        element: <FollowPage />,
      },
      {
        path: '/friendList',
        element: <FollowListPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
