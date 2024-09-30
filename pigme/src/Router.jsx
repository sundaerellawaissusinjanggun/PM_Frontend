import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CustomizePage from './pages/Login/CustomizePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SetupProfilePage from './pages/Login/SetupProfilePage';
import WriteMessagePage from './pages/Message/WriteMessagePage';
import ReadMessagePage from './pages/Message/ReadMessagePage';
import RecentMessagePage from './pages/Message/RecentMessagePage';
import AddFriendsPage from './pages/Friend/AddFriendsPage';
import RequestFriendsListPage from './pages/Friend/RequestFriendsListPage';
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
        element: <SetupProfilePage />,
      },
      {
        path: '/myBank',
        element: <MyPiggyBankPage />,
      },
      {
        path: '/message',
        element: <WriteMessagePage />,
      },
      {
        path: '/readMessage',
        element: <ReadMessagePage />,
      },
      {
        path: '/myMessage',
        element: <RecentMessagePage />,
      },
      {
        path: '/friend',
        element: <AddFriendsPage />,
      },
      {
        path: '/friendList',
        element: <RequestFriendsListPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
