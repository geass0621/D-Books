import { useLoaderData } from "react-router-dom";
import { Order } from "../models/OrderModel";
import AdminOrderItem from "../Components/Admin/AdminOrderItem";

const AdminOrders: React.FC = () => {
  const orders = useLoaderData() as Order[];

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <AdminOrderItem key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminOrders;


export const adminOrdersLoader = async () => {
  // Fetch admin orders from the server
  const response = await fetch('http://localhost:3000/admin/orders', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch admin orders' }), {
      status: response.status,
    });
  }

  const data = await response.json();
  return data.orders;
}