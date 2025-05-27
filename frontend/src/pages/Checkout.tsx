import { Cart } from "../models/CartModel";

const Checkout: React.FC = () => {
  return (
    <div>
      This is checkout page.
    </div>
  );
}

export default Checkout;

const checkoutLoader = async () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}') as Cart;
  if (cart && cart.userId) {
    return cart;
  }
  return {};
}