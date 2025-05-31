import { model, Schema } from "mongoose";

export interface ICartItem {
  bookId: string,
  quantity: number,
  discountPrice: number,
  name: string,
  imageUrl: string,
  price: number,
  discount: number,
}

export interface ICart {
  userId: string,
  userEmail: string,
  items: ICartItem[],
  totalPrice: number,
  totalQuantity: number,
  isSync: boolean,
}

export interface IUser {
  email: string,
  password: string,
  role: 'admin' | 'user',
  status: 'online' | 'offline'
  cart?: ICart,
  orders?: string[],
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
    type: new Schema<ICart>({
      userId: { type: String, required: true },
      userEmail: { type: String, required: true },
      items: {
        type: [new Schema<ICartItem>({
          bookId: { type: String, required: true },
          quantity: { type: Number, required: true },
          discountPrice: { type: Number, required: true },
          name: { type: String, required: true },
          imageUrl: { type: String, required: true },
          price: { type: Number, required: true },
          discount: { type: Number, required: true }
        })],
        default: []
      },
      totalPrice: { type: Number, required: true, default: 0 },
      totalQuantity: { type: Number, required: true, default: 0 },
      isSync: { type: Boolean, required: true, default: false }
    })
  },
  orders: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    default: []
  }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User