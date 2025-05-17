import { CartItem } from "./CartItemModel"

export type Cart = {
  userId: String,
  userName: String,
  address: String,
  items: CartItem[],
  totalPrice: Number
}