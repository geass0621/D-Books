import { Form, Navigate, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { cartActions, selectCart } from "../store/cart-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user-slice";
import { Cart } from "../models/CartModel";
import React, { useEffect } from "react";
import { Order } from "../models/OrderModel";
import { loadStripe } from "@stripe/stripe-js";

const UserOrder: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const cartServer = useLoaderData() as Cart;
  const cart = useAppSelector(selectCart);
  const orderActionData = useActionData() as { message: string; success: boolean; sessionId: string } | undefined;

  // Check if the user is logged in
  useEffect(() => {
    if (orderActionData && orderActionData.success && orderActionData.sessionId) {
      // If order is successful, redirect to the payment page
      const stripePromise = loadStripe('pk_test_51OmEm0F6YsUjKW1RPm1bKXCThVqZyNww09q4kbFHa6QvCVTYFHZkKswx8RBEhjkGGurPKAIflLHCG3VLMtiCcoU900NfyDXHLo');
      if (!stripePromise) {
        throw new Error('Stripe not initialized');
      }
      stripePromise.then((stripe) => {
        if (stripe) {
          stripe.redirectToCheckout({ sessionId: orderActionData.sessionId });
        }
      });
    }
  }, [orderActionData, dispatch]);

  // Sync client cart with server cart if they are not ordered
  useEffect(() => {
    if (!orderActionData && cart && cartServer && JSON.stringify(cart) !== JSON.stringify(cartServer)) {
      dispatch(cartActions.setCart(cartServer));
    }
  }, [cart, cartServer, dispatch, orderActionData]);

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
              <span className="font-semibold">{item.name} (x{item.quantity})</span>
              <span className="font-semibold">${(item.discountPrice * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">Total:</span>
            <span className="font-bold text-2xl">${cartServer.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Form method="post" className="flex flex-wrap gap-4 mt-6 bg-base-300 shadow-md rounded-lg p-6">
        <div className="flex-1 min-w-[45%]">
          <h2 className="text-xl font-semibold mb-4">Your Name</h2>
          <input className="w-full bg-base-200 p-2 rounded-md shadow-2xl" type="text" name="name" />
        </div>
        <div className="flex-1 min-w-[45%]">
          <h2 className="text-xl font-semibold mb-4">Email</h2>
          <input className="w-full bg-base-200 p-2 rounded-md shadow-2xl" type="email" name="email" defaultValue={user.email ?? ''} />
        </div>
        <div className="flex-1 min-w-[45%]">
          <h2 className="text-xl font-semibold mb-4">Phone Number</h2>
          <input className="w-full bg-base-200 p-2 rounded-md shadow-2xl" type="tel" name="phone" />
        </div>
        <div className="flex-1 min-w-[45%]">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input className="w-full p-2 bg-base-200 rounded-md shadow-2xl" type="text" name="shippingAddress" />
        </div>
        <input type="hidden" name="userId" value={user.id ?? ''} />
        <input type="hidden" name="items" value={JSON.stringify(cartServer.items)} />
        <input type="hidden" name="totalAmount" value={cartServer.totalPrice.toFixed(2)} />
        <div className="flex-1 min-w-[45%]">
          <button className="btn btn-primary w-full" type="submit">
            Place Order
          </button>
        </div>
      </Form>
    </div>
  );
}

export default UserOrder;

// Loader and Action for UserOrder component
export const userOrderLoader = async () => {
  try {
    const response = await fetch('http://localhost:3000/cart', {
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

export const userOrderAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;
  const items = JSON.parse(formData.get('items') as string);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const shippingAddress = formData.get('shippingAddress') as string;
  const totalAmount = parseFloat(formData.get('totalAmount') as string);

  const order: Order = {
    userId,
    items,
    name,
    email,
    phone,
    shippingAddress,
    status: 'ongoing',
    paymentStatus: 'pending',
    totalAmount: totalAmount,
  }

  try {

    // post the order to the server
    const response = await fetch('http://localhost:3000/checkout/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    const data = await response.json();
    console.log("Order placed successfully:", data);

    // post payment to the server
    const paymentResponse = await fetch('http://localhost:3000/checkout/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId,
        items,
        totalAmount,
        orderId: data.orderId,
      }),
    });

    if (!paymentResponse.ok) {
      throw new Error('Failed to process payment');
    }

    const paymentData = await paymentResponse.json();

    const sessionId = paymentData.sessionId;

    return {
      message: 'Order placed successfully!',
      success: true,
      sessionId: sessionId,
    };

  } catch (error) {
    console.error("Error placing order:", error);
    throw new Response(JSON.stringify({ message: 'Failed to place order' }), {
      status: 500
    });
  }
}
