import { Cart } from "./CartModel"

export type User = {
  id: String,
  email: String,
  name: String,
  cart: Cart,
}