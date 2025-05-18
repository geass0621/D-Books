import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string
  cart: Schema.Types.ObjectId[];
  role: 'admin' | 'user'
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
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User