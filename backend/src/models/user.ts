import { model, Schema } from "mongoose";

export interface IUser {
  email: string,
  password: string,
  role: 'admin' | 'user',
  status: 'online' | 'offline'
  cart?: {
    userId: string,
    userEmail: string,
    items: {
      bookId: string,
      quantity: number,
      discountPrice: number,
      name: string
    }[],
    totalPrice: number,
    totalQuantity: number
  }
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  cart: {
    type: {
      userId: { type: String, required: true },
      userEmail: { type: String, required: true },
      items: [{
        bookId: { type: String, required: true },
        quantity: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
        name: { type: String, required: true }
      }],
      totalPrice: { type: Number, default: 0 },
      totalQuantity: { type: Number, default: 0 },
    },
    required: false,
    default: undefined
  }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User