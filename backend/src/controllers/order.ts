import { RequestHandler } from "express";
import User from "../models/user";
import Order, { IOrder } from "../models/order";

export const postOrder: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  const orderData = req.body;
  console.log('Order data received:', orderData);
  // Validate order data
  if (!orderData || !orderData.items || orderData.items.length === 0) {
    res.status(400).json({
      message: 'Invalid order data. Please provide valid items.',
    });
    return;
  }

  // Fetch the user from the database
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({
      message: 'User not found. Please log in.',
    });
    return;
  }

  // Create a new order
  const newOrder = new Order({
    userId: user.id,
    items: orderData.items,
    name: orderData.name,
    email: orderData.email,
    phone: orderData.phone,
    shippingAddress: orderData.shippingAddress,
    status: 'ongoing',
    paymentStatus: 'pending',
    totalAmount: orderData.totalAmount,
  } as IOrder);

  // Save the order to the database (assuming you have an Order model)
  const order = await newOrder.save();

  if (!order) {
    res.status(500).json({
      message: 'Failed to place order. Please try again later.',
    });
    return;
  }

  // update the user's cart to empty it after placing the order
  user.cart = {
    userId: user.id,
    userEmail: user.email,
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    isSync: false
  };

  // update the user's orders
  if (!user.orders) {
    user.orders = [];
  }
  user.orders.push(order.id);
  await user.save();

  // Respond with success
  res.status(201).json({
    message: 'Order placed successfully!',
    order: order,
  });
}