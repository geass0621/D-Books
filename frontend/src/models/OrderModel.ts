import { CartItem } from "./CartItemsModel"

export type Order = {
  _id?: string,
  items: CartItem[],
  shippingAddress: string,
  email: string,
  phone: string,
  name: string,
  userId: string,
  status: 'ongoing' | 'delivered' | 'cancelled',
  paymentStatus: 'pending' | 'paid',
  totalAmount: number
}