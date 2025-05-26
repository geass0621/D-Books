import { CartItem } from "./CartItemsModel"

export type Cart = {
  userId: string,
  userEmail: string,
  items: CartItem[],
  totalPrice: number,
  totalQuantity: number,
}