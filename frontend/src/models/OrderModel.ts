import { CartItem } from "./CartItemModel"

type Order = {
  items: CartItem[],
  address: String,
  userName: String,
  userId: String,
  status: 'Ongoing' | 'Delivered'
}