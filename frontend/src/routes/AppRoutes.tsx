import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import Authentication, { action as authAction } from '../pages/Authentication';
import ErrorPage from '../pages/Error';
import Books from '../pages/Books';
import BookDetail from '../pages/BookDetail';
import BooksLayout from '../pages/BooksLayout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      id: 'root',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'books',
          element: <BooksLayout />,
          children: [
            {
              index: true,
              element: <Books />
            },
            {
              path: ':bookId',
              element: <BookDetail />
            }
          ]
        },
        {
          path: 'auth',
          element: <Authentication />,
          action: authAction
        },
      ]
    }
  ]
);


export default router