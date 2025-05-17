import { CartItem } from "./CartItem"

export type Cart = {
  userId: String,
  userName: String,
  address: String,
  items: CartItem[],
  totalPrice: Number
}