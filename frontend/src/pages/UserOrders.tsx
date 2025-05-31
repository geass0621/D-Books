import { Navigate, useLoaderData } from "react-router-dom";
import { cartActions, selectCart } from "../store/cart-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user-slice";
import { Cart } from "../models/CartModel";
import React, { useEffect } from "react";

const UserOrder: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const cartServer = useLoaderData() as Cart;
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    if (cart && cartServer && JSON.stringify(cart) !== JSON.stringify(cartServer)) {
      dispatch(cartActions.setCart(cartServer));
    }
  }, [cart, cartServer, dispatch]);

  if (user.loading) {
    return <div>Loading...</div>; // or a spinner component
  }
  if (!cartServer.isSync) {
    return <Navigate to="/checkout" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Order</h1>
      <div className="bg-base-300 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="space-y-4">
          {cartServer.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.discountPrice * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-2xl">${cartServer.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;

export const userOrderLoader = async () => {
  try {
    const response = await fetch('http://localhost:3000/checkout', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Response(JSON.stringify({ message: 'Failed to fetch cart' }), {
      status: 500
    });
  }

};