import { useState } from "react";
import { Order } from "../../models/OrderModel";

interface OrderItemProps {
  order: Order;
}

const AdminOrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(prev => !prev);
  };

  return (
    <div className="bg-base-300 shadow-md rounded-lg p-6 mb-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Order ID: {order._id}</h2>
        <p className="mb-4">Payment: {order.paymentStatus}</p>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-primary m-1">Status: {order.status}</label>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a className="font-semibold">Ongoing</a></li>
            <li><a className="font-semibold">Delivered</a></li>
            <li><a className="font-semibold">Cancelled</a></li>
          </ul>
        </div>
        <button className="btn btn-primary" >Save</button>
        <button className="btn btn-primary" onClick={toggleDetails}>View Details</button>
      </div>
      {isDetailsVisible && <div>
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between my-4">
          <span className="font-semibold">Name:</span>
          <span className="font-semibold text-2xl">{order.name}</span>
        </div>
        <div className="flex justify-between my-4">
          <span className="font-semibold">Shipping Address:</span>
          <span className="font-semibold text-2xl">{order.shippingAddress}</span>
        </div>
        <div className="flex justify-between my-4">
          <span className="font-semibold">Phone Number:</span>
          <span className="font-semibold text-2xl">{order.phone}</span>
        </div>
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


export default AdminOrderItem;