import React from 'react';
import CartItem from './CartItem';
import { useAppSelector } from '../store/hooks';
import { selectCart } from '../store/cart-slice';
import { useNavigate } from 'react-router-dom';

interface cartProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<cartProps> = ({ setIsModalOpen }) => {
  const cart = useAppSelector(selectCart);
  const { items, totalPrice, totalQuantity } = cart;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setIsModalOpen(false);
    navigate('/checkout');
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        {items.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty</p>
        ) : (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="bg-base-100 shadow-md rounded-lg p-4">
              {items.map((item) => (
                <CartItem key={item.bookId} cartItem={item} />
              ))}
              <div className="mt-4 border-t pt-4">
                <p className="text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Total Quantity: {totalQuantity}</p>
              </div>
              <div className="flex justify-end">
                <button className='btn btn-info btn-md mt-2' onClick={checkoutHandler}>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;