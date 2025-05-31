import { Form, redirect, useNavigation, } from "react-router-dom";
import CheckoutItem from "../Components/CheckoutItem";
import { useAppSelector } from "../store/hooks";
import { selectCart } from "../store/cart-slice";

const Checkout: React.FC = () => {
  const cart = useAppSelector(selectCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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
                <Form method="post" className="mt-2">
                  <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                  <button className="btn btn-primary w-full" disabled={isSubmitting}>{
                    isSubmitting ? 'Submitting' : 'Order Now!'}</button>
                </Form>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Checkout;

export const syncCartWithServerAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  try {
    const response = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: formData.get('cart') as string,
    });

    if (!response.ok) {
      throw new Error('Failed to sync cart with server');
    }

    return redirect('/checkout/order-success');
  } catch (error) {
    console.error('Error syncing cart:', error);
  }
};
