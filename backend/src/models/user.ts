import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string
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
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User