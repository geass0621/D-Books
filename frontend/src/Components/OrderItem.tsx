import { useState } from "react";
import { Order } from "../models/OrderModel";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(prev => !prev);
  };

  return (
    <div className="bg-base-300 shadow-md rounded-lg p-6 mb-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Order ID: {order._id}</h2>
        <p className="mb-4">Payment: {order.paymentStatus}</p>
        <p className="mb-4">Status: {order.status}</p>
        <button className="btn btn-primary" onClick={toggleDetails}>View Details</button>
      </div>
      {isDetailsVisible && <div>
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="space-y-4">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span className="font-semibold">{item.name} (x{item.quantity})</span>
              <span className="font-semibold">${(item.discountPrice * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">Total:</span>
            <span className="font-bold text-2xl">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>}

    </div>
  );
};


export default OrderItem;