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
import Checkout from '../pages/Checkout';
import ProtectedUserRoute from '../pages/ProtectedUserRoute';
import UserOrders from '../pages/UserOrders';

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
        {
          path: 'checkout',
          element: <ProtectedUserRoute />,
          children: [
            {
              index: true,
              element: <Checkout />
            },
            {
              path: 'orders',
              element: <UserOrders />
            }
          ]
        }
      ]
    }
  ]
);


export default router