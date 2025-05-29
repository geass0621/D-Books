import { useEffect, useState } from "react";
import { Cart } from "../models/CartModel";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const localCart = JSON.parse(localStorage.getItem('cart') || '{}') as Cart;
  const navigate = useNavigate();
  const [syncCart, setSyncCart] = useState<Cart>();

  useEffect(() => {
    if (!localCart.userId || !localCart.userEmail) {
      navigate('/auth?mode=login', { replace: true });
    }
    syncCartWithServer(localCart)
      .then((cart) => {
        if (cart) {
          setSyncCart(cart);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      })
      .catch((error) => {
        console.error('Error syncing cart:', error);
      });

  }, [navigate]);

  return (
    <>
      {!syncCart ?
        (<div>
          <h1>Loading...</h1>
        </div>)
        :
        (<div>This is checkout</div>)
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
}