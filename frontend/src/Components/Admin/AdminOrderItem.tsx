import { useState } from "react";
import { Order } from "../../models/OrderModel";
import { useNavigation } from "react-router-dom";

interface OrderItemProps {
  order: Order;
  saveChanges: (orderId: string, status: string, action: string) => void;
}

const AdminOrderItem: React.FC<OrderItemProps> = ({ order, saveChanges }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const toggleDetails = () => {
    setDetailsVisible(prev => !prev);
  };

  const selectStatus = (status: "ongoing" | "delivered" | "cancelled") => {
    // This function can be used to handle status selection
    setOrderStatus(status);
    console.log(`Status changed to: ${orderStatus}`);
  }

  return (
    <div className="bg-base-300 shadow-md rounded-lg p-6 mb-4">
      <div className="mb-4 flex flex-wrap justify-between items-start gap-2">
        <h2 className="text-xl font-semibold mb-4 min-w-[180px]">Order ID: {order._id}</h2>
        <div className="flex flex-col items-start min-w-[180px]">
          <p className="mb-4 font-bold">Payment: {order.paymentStatus}</p>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className={`btn ${orderStatus === 'ongoing'
            ? 'btn-neutral'
            : orderStatus === 'delivered'
              ? 'btn-primary'
              : orderStatus === 'cancelled'
                ? 'btn-error'
                : ''} m-1 min-w-[120px]`}>
            Status: {orderStatus}
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a className="font-semibold" onClick={() => selectStatus('ongoing')}>Ongoing</a></li>
            <li><a className="font-semibold" onClick={() => selectStatus('delivered')}>Delivered</a></li>
            <li><a className="font-semibold" onClick={() => selectStatus('cancelled')}>Cancelled</a></li>
          </ul>
        </div>
        <div className="flex flex-row gap-x-2 items-start">
          <button className="btn btn-secondary min-w-[100px]" disabled={isSubmitting} onClick={() => saveChanges(order._id ?? '', orderStatus, 'updateStatus')}>{
            isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Save'
          }</button>
          <button className="btn btn-info min-w-[100px]" onClick={toggleDetails}>View Details</button>
          <button className="btn btn-error min-w-[100px]" disabled={isSubmitting} onClick={() => saveChanges(order._id ?? '', orderStatus, 'deleteOrder')}>{
            isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Delete'
          }</button>
        </div>
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