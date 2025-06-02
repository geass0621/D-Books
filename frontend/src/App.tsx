import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes'
import { ThemeProvider } from './store/ThemeContext';
import { use, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectUser, userActions } from './store/user-slice';
import { getCart, getUser, syncCartWithServer } from './utils/auth';
import { cartActions } from './store/cart-slice';
import { Cart } from './models/CartModel';
import openSocket from 'socket.io-client';



const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const socket = openSocket('http://localhost:3000', {
  //     withCredentials: true,
  //   });
  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket server');
  //   });
  // }, []);

  // Getting user
  useEffect(() => {
    const fetchUser = async () => {
      if (user.id === null) {
        // If user is not logged in, try to fetch user data
        dispatch(userActions.setUserLoading(true));
        try {
          const userData = await getUser();
          if (userData) {
            dispatch(userActions.setUserLogin(userData));
          }
        } catch (err: any) {
          if (err?.response?.status === 401 || err?.status === 401) {
            // If user is not authenticated, clear user data and cart
            dispatch(userActions.setUserLogout());
          } else {
            console.error(err);
          }
        } finally {
          dispatch(userActions.setUserLoading(false));
        }
      } else {
        return;
      }
    };
    fetchUser();
  }, [dispatch]);

  // Syncing cart with server
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (user.id) {
      getCart()
        .then((cart: Cart) => {
          if (cart && localCart.items.length === 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(cartActions.setCart(cart));
          }
          if (cart && localCart.items.length > 0) {
            syncCartWithServer(localCart)
              .then(() => {
                dispatch(cartActions.setCart(localCart));
              })
              .catch((err: any) => {
                console.error('Failed to sync cart with server:', err);
              });

          }
        })
        .catch((err: any) => {
          console.error('Failed to fetch cart:', err);
        });
    } else {
      dispatch(cartActions.setCart(localCart));
    }
  }, [user.id, dispatch]);

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router}>

        </RouterProvider>
      </ThemeProvider>
    </>
  )
}

export default App
