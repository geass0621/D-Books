import { CartItem } from "./CartItem"

type Order = {
  items: CartItem[],
  address: String,
  userName: String,
  userId: String,
  status: 'Ongoing' | 'Delivered'
}