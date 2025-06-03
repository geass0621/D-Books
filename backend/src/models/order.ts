import { model, Schema } from "mongoose";

export interface IOrderItem {
  bookId: string,
  quantity: number,
  discountPrice: number,
  name: string,
  imageUrl: string,
  price: number,
  discount: number,
}

export interface IOrder {
  items: IOrderItem[],
  shippingAddress: string,
  email: string,
  phone: string,
  name: string,
  userId: string,
  status: 'ongoing' | 'delivered' | 'cancelled',
  paymentStatus: 'pending' | 'paid',
  totalAmount: number
}

const orderSchema = new Schema<IOrder>({
  items: [{
    bookId: { type: String, required: true },
    quantity: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true }
  }],
  shippingAddress: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, enum: ['ongoing', 'delivered', 'cancelled'], default: 'ongoing' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  totalAmount: { type: Number, required: true }
}, {
  timestamps: true
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;