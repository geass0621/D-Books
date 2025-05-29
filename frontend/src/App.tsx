import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes'
import { ThemeProvider } from './store/ThemeContext';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectUser, userActions } from './store/user-slice';
import { getUser } from './utils/auth';
import { cartActions } from './store/cart-slice';
import { Cart } from './models/CartModel';
import openSocket from 'socket.io-client';



const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const localCart = JSON.parse(localStorage.getItem('cart') || '{}') as Cart;
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

  useEffect(() => {
    if (localCart.items && localCart.items.length > 0) {
      dispatch(cartActions.setCart(localCart));
    }
  }, [localCart, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      if (user.id === null) {
        // If user is not logged in, try to fetch user data
        dispatch(userActions.setUserLoading(true));
        try {
          const userData = await getUser();
          if (userData) {
            dispatch(userActions.setUserLogin(userData));
            localCart.userId = userData.id;
            localCart.userEmail = userData.email;
            localStorage.setItem('cart', JSON.stringify(localCart));
            dispatch(cartActions.setCart(localCart));
            // Navigate to home after successful login
          }
        } catch (err: any) {
          if (err?.response?.status === 401 || err?.status === 401) {
            // If user is not authenticated, clear user data and cart
            dispatch(userActions.setUserLogout());
            localCart.userId = null;
            localCart.userEmail = null;
            localStorage.setItem('cart', JSON.stringify(localCart));
            dispatch(cartActions.setCart(localCart));
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
  }, []);

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
