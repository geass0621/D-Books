import { useEffect } from "react";
import MainNavigation from "../Components/MainNavigation"
import { Outlet, useActionData } from "react-router-dom"
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/user-slice";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
const RootLayout: React.FC = () => {
  const actionData = useActionData() as null | undefined;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (actionData === null) {
      dispatch(userActions.setUserLogout());
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        const cart = JSON.parse(localCart);
        // Clear user info from cart, but keep the cart items
        const updatedCart = { ...cart, userId: null, userEmail: null };
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        // If no cart exists, initialize an empty cart
        localStorage.setItem('cart', JSON.stringify({ items: [], totalAmount: 0, userId: null, userEmail: null }));
      }
      toast.success('Logged out successfully!');
    }
  }, [actionData]);

  return <>
    <MainNavigation />
    <main className="max-w-7xl m-auto p-8">
      <Outlet />
    </main>
    <Footer />
  </>
}

export default RootLayout

export const rootLayoutLogoutAction = async () => {
  const response = await fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status === 401) {
    return null; // User is not logged in, no action needed
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to log out' }), {
      status: response.status,
    });
  }

  return null;
}