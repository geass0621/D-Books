import type { CartItem } from "../models/CartItemsModel";
import { cartActions } from "../store/cart-slice";
import { useAppDispatch } from "../store/hooks";

interface CartItemProps {
  cartItem: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch();

  const incrementHandler = () => {
    dispatch(cartActions.incrementItemQuantity(cartItem.bookId));
  }

  const decrementHandler = () => {
    dispatch(cartActions.decrementItemQuantity(cartItem.bookId));
  }

  return (
    <div className="flex items-center justify-between p-4 ">
      <div>
        <p className="mr-5">{cartItem.name}</p>
      </div>
      <div>
        <button className="btn btn-sm btn-circle btn-primary font-bold" onClick={incrementHandler}>+</button>
        <span className="mx-3 font-bold">{cartItem.quantity}</span>
        <button className="btn btn-sm btn-circle btn-neutral font-bold" onClick={decrementHandler}>-</button>
      </div>
    </div>
  );
}

export default CartItem;