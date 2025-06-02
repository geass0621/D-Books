import { useLoaderData } from "react-router-dom";
import OrderItem from "../Components/OrderItem";
import { Order } from "../models/OrderModel";

const Orders: React.FC = () => {
  const orders = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

export const ordersLoader = async () => {
  // Fetch orders from the server
  const response = await fetch('http://localhost:3000/orders', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch orders' }), {
      status: response.status,
    });
  }

  const data = await response.json();
  return data.orders;
}