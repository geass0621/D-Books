import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import Authentication, { action as authAction } from '../pages/Authentication';
import ErrorPage from '../pages/Error';
import { tokenLoader } from '../utils/auth';

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
        }

      ]
    }
  ]
);


export default router