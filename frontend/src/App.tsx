import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes'
import { ThemeProvider } from './store/ThemeContext';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectUser, userActions } from './store/user-slice';
import { getUser } from './utils/auth';
import { cartActions } from './store/cart-slice';
import { Cart } from './models/CartModel';



const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const localCart = JSON.parse(localStorage.getItem('cart') || '{}') as Cart;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localCart.items && localCart.items.length > 0) {
      dispatch(cartActions.setCart(localCart));
    }
  }, [localCart, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      if (user.id !== null) {
        const userData = await getUser();
        if (userData) {
          dispatch(userActions.setUserLogin(userData));
        }
        console.log(userData);
      } else {
        return;
      }
    };
    fetchUser();
  }, [user.id])

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
