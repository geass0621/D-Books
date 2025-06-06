import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { Order } from "../models/OrderModel";
import AdminOrderItem from "../Components/Admin/AdminOrderItem";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/user-slice";

const AdminOrders: React.FC = () => {
  const orders = useLoaderData() as Order[];
  const submit = useSubmit();
  const actionData = useActionData() as { message?: string; success?: boolean } | undefined;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const saveChangesHandler = (orderId: string, status: string, action: string) => {
    submit(
      { orderId, status, action },
      {
        method: 'post',
        action: `/admin/orders`,
      }
    );
  }

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message || 'Changes saved successfully');
      } else {
        toast.error(actionData.message || 'Failed to save changes');
        if (actionData.message === 'Unauthorized') {
          toast.error('You are not authorized to perform this action.');
          dispatch(userActions.setUserLogout());
          navigate('/login?mode=login');
        }
      }
    }
  }, [actionData, navigate]);

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <AdminOrderItem key={order._id} order={order} saveChanges={saveChangesHandler} />
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
};

export const adminOrdersAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const orderId = formData.get('orderId') as string;
  const status = formData.get('status') as string;
  const action = formData.get('action') as string;

  if (action === 'updateStatus') {
    // Update the order status on the server
    const response = await fetch(`http://localhost:3000/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });

    if (response.status === 401) {
      return { message: 'Unauthorized access', success: false, };
    }
    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Failed to update order status' }), {
        status: response.status,
      });
    }

    return { message: 'Order status updated successfully', success: true };
  };
  if (action === 'deleteOrder') {
    // Delete the order on the server
    const response = await fetch(`http://localhost:3000/admin/orders/${orderId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 401) {
      return { message: 'Unauthorized', success: false, };
    }

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Failed to delete order' }), {
        status: response.status,
      });
    }

    return { message: 'Order deleted successfully', success: true };
  };
  if (action !== 'updateStatus' && action !== 'deleteOrder') {
    throw new Response(JSON.stringify({ message: 'Unsupported action' }), {
      status: 422,
    });
  };

  return null;

}