import { cartActions } from "../store/cart-slice";
import { useAppDispatch } from "../store/hooks";
import CartItem from "./CartItem";

interface CheckoutItemProps {
  item: CartItem;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const incrementItemQuantity = (itemId: string) => {
    dispatch(cartActions.incrementItemQuantity(itemId));
  }

  const decrementItemQuantity = (itemId: string) => {
    dispatch(cartActions.decrementItemQuantity(itemId));
  }

  return (
    <div className="flex items-center justify-between p-4 bg-base-200 shadow-md rounded-lg w-full">
      <div className="flex flex-row items-center flex-1 min-w-0">
        <img src={item.imageUrl} alt={item.name} className="w-16 h-24 object-cover mr-4" />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate">{item.name}</h3>
          <p className="text-sm text-gray-600 font-bold">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex flex-col items-center ml-4 flex-1">
        <span className="line-through font-bold text-gray-500">${item.price.toFixed(2)}</span>
        <span className="text-lg font-semibold text-primary">${item.discountPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center justify-center w-full space-x-2">
          <button className="btn btn-primary btn-circle btn-sm" onClick={() => incrementItemQuantity(item.bookId)}>+</button>
          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
          <button className="btn btn-neutral btn-sm" onClick={() => decrementItemQuantity(item.bookId)}>-</button>
        </div>
      </div>
      <div className="ml-4 flex-1 flex justify-end">
        <span className="text-lg font-semibold text-primary">${(item.discountPrice * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CheckoutItem;


