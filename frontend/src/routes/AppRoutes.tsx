import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import Authentication, { action as authAction } from '../pages/Authentication';
import ErrorPage from '../pages/Error';
import Books from '../pages/Books';
import BookDetail, { bookDetailLoader } from '../pages/BookDetail';
import BooksLayout from '../pages/BooksLayout';
import { booksLoader } from '../pages/BooksLayout';
import { homeLoader } from '../pages/Home';

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
          element: <Home />,
          loader: homeLoader
        },
        {
          path: 'books',
          id: 'books',
          element: <BooksLayout />,
          loader: booksLoader,
          children: [
            {
              index: true,
              element: <Books />
            },
            {
              path: ':bookId',
              element: <BookDetail />,
              loader: bookDetailLoader
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