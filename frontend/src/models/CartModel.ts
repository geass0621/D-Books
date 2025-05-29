import { CartItem } from "./CartItemsModel"

export type Cart = {
  userId: string | null,
  userEmail: string | null,
  items: CartItem[],
  totalPrice: number,
  totalQuantity: number,
}