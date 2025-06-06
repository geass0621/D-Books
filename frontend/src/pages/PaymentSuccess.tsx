import { FcOk } from "react-icons/fc";
import { useAppDispatch } from "../store/hooks";
import { cartActions } from "../store/cart-slice";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";


const PaymentSuccess: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useLoaderData()

  // clear cart items from local storage and reset cart state
  useEffect(() => {
    dispatch(cartActions.setCart(cart));
    const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
    localCart.items = [];
    localCart.totalPrice = 0;
    localCart.totalQuantity = 0;
    localCart.isSync = false;
    localStorage.setItem('cart', JSON.stringify(localCart));

  }, [cart]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100">
      <FcOk className="text-6xl mb-4" />
      <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
      <p className=" mb-6">Thank you for your payment! Your transaction has been completed successfully.</p>
      <a href="/" className="btn btn-secondary">Return to Home</a>
    </div>
  );
};

export default PaymentSuccess;


export const paymentSuccessLoader = async () => {
  // get the cart from server
  const response = await fetch('http://localhost:3000/cart', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch cart' }), {
      status: response.status,
    });
  }

  const data = await response.json();
  return data.cart;
}