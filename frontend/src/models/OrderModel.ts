import { CartItem } from "./CartItemsModel"

type Order = {
  items: CartItem[],
  shippingAddress: string,
  email: string,
  phone: string,
  userName: string,
  userId: string,
  status: 'Ongoing' | 'Delivered',
  paymentStatus: 'Pending' | 'Paid',
  totalAmount: number
}