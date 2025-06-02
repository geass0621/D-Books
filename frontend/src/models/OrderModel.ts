import { CartItem } from "./CartItemsModel"

export type Order = {
  _id?: string,
  items: CartItem[],
  shippingAddress: string,
  email: string,
  phone: string,
  name: string,
  userId: string,
  status: 'ongoing' | 'delivered',
  paymentStatus: 'pending' | 'paid',
  totalAmount: number
}