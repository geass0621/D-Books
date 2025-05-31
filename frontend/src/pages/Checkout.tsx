import { useEffect } from "react";
import { Cart } from "../models/CartModel";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "../Components/CheckoutItem";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartActions, selectCart } from "../store/cart-slice";

const Checkout: React.FC = () => {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  return (
    <>
      {!cart ?
        (<div>
          <h1>Loading...</h1>
        </div>)
        :
        (
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="bg-base-300 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <ul className="space-y-4">
                {cart.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <CheckoutItem item={item} />
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-2xl">${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <button className="btn btn-primary w-full" onClick={() => navigate('/payment')}>Proceed to Payment</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Checkout;

const syncCartWithServer = async (cart: Cart) => {
  try {
    const response = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error('Failed to sync cart with server');
    }

    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error('Error syncing cart:', error);
  }
};
