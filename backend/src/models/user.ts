import { model, Schema } from "mongoose";

export interface IUser {
  name: String;
  email: String;
  password: String
  cart: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: false,
  },
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
  ]
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User