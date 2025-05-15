import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />
    }
  ]
);


export default router