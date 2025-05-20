import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import Authentication, { action as authAction } from '../pages/Authentication';
import ErrorPage from '../pages/Error';
import { tokenLoader } from '../utils/auth';
import { logoutAction } from '../pages/Logout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      id: 'root',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'auth',
          element: <Authentication />,
          action: authAction
        },
        {
          path: 'logout',
          action: logoutAction
        }
      ]
    }
  ]
);


export default router