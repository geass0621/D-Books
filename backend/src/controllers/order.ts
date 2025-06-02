import { RequestHandler } from "express";
import User, { ICart } from "../models/user";
import Order, { IOrder } from "../models/order";
import Stripe from "stripe";

export const postOrder: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  const orderData = req.body;
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

  // update the user's orders
  if (!user.orders) {
    user.orders = [];
  }
  user.orders.push(order.id);
  await user.save();

  // Respond with success
  res.status(201).json({
    message: 'Order placed successfully!',
    orderId: order.id,
  });
}

export const postPayment: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  const { items, totalAmount, orderId } = req.body;

  // Validate payment data
  if (!items || items.length === 0 || !totalAmount || !orderId || !userId) {
    res.status(400).json({
      message: 'Invalid payment data.',
    });
    return;
  }

  const stripeInstance = new Stripe(process.env.STRIPE_KEY as string)

  const lineProducts = items.map((item: any) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.discountPrice * 100),
      },
      quantity: item.quantity,
    }
  });

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineProducts,
    success_url: `http://localhost:5173/checkout/payment-success`,
    cancel_url: `http://localhost:5173/checkout/payment-cancel`,
    metadata: {
      orderId: orderId,
      userId: userId,
    },
  });

  if (!session) {
    res.status(500).json({
      message: 'Failed to create payment session. Please try again later.',
    });
    return;
  }

  res.status(200).json({
    message: 'Payment session created successfully!',
    sessionId: session.id,
  });

};

export const postPaymentConfirmation: RequestHandler = async (req, res, next) => {
  const stripeInstance = new Stripe(process.env.STRIPE_KEY as string);
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, webhookSecret as string);
  } catch (err: any) {
    console.log(webhookSecret);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event?.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;

    // Update the order status to 'paid'
    const orderResult = await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
    }, { new: true });

    if (!orderResult) {
      res.status(404).json({
        message: 'Order not found.',
      });
      return;
    };

    // Update the user's cart
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: 'User not found.',
      });
      return;
    }
    // Clear the user's cart
    user.cart = {
      userId: user.id,
      userEmail: user.email,
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
      isSync: false,
    } as ICart;

    await user.save();
  } else {
    res.status(200).json({
      message: `Unhandled event type ${event.type}`,
    });
    return;
  };

  res.status(200).json({
    message: 'Payment confirmed successfully!'
  });
}