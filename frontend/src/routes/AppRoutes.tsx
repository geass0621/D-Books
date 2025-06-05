import { createBrowserRouter } from 'react-router-dom'
import RootLayout, { rootLayoutLogoutAction } from '../pages/RootLayout';
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
import UserOrder, { userOrderAction, userOrderLoader } from '../pages/UserOrder';
import { syncCartWithServerAction } from '../pages/Checkout';
import PaymentSuccess, { paymentSuccessLoader } from '../pages/PaymentSuccess';
import PaymentCancel from '../pages/PaymentCancel';
import Orders, { ordersLoader } from '../pages/Orders';
import ProtectedAdminRoute from '../pages/ProtectedAdminRoutes';
import AdminOrders, { adminOrdersAction, adminOrdersLoader } from '../pages/AdminOrders';
import AdminEditBook, { adminEditBookAction, adminEditBookLoader } from '../pages/AdminEditBook';
import AdminDeleteBook, { AdminDeleteBookAction, AdminDeleteBookLoader } from '../pages/AdminDeleteBook';
import AdminAddBook, { adminAddBookAction } from '../pages/AdminAddBook';

const router = createBrowserRouter(
  [
    {
      path: '/',
      id: 'root',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      action: rootLayoutLogoutAction,
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
              element: <Checkout />,
              id: 'checkout',
              action: syncCartWithServerAction
            },
            {
              path: 'order',
              element: <UserOrder />,
              loader: userOrderLoader,
              action: userOrderAction
            },
            {
              path: 'payment-success',
              element: <PaymentSuccess />,
              loader: paymentSuccessLoader
            },
            {
              path: 'payment-cancel',
              element: <PaymentCancel />
            }
          ]
        },
        {
          path: 'orders',
          element: <ProtectedUserRoute />,
          children: [
            {
              index: true,
              element: <Orders />,
              loader: ordersLoader
            }
          ],
        },
        {
          path: '/admin',
          element: <ProtectedAdminRoute />,
          children: [
            {
              path: 'orders',
              element: <AdminOrders />,
              loader: adminOrdersLoader,
              action: adminOrdersAction
            },
            {
              path: 'edit-book/:bookId',
              element: <AdminEditBook />,
              loader: adminEditBookLoader,
              action: adminEditBookAction
            },
            {
              path: 'delete-book/:bookId',
              element: <AdminDeleteBook />,
              loader: AdminDeleteBookLoader,
              action: AdminDeleteBookAction
            },
            {
              path: 'add-book',
              element: <AdminAddBook />,
              action: adminAddBookAction
            }
          ]
        }
      ]
    }
  ]
);


export default router