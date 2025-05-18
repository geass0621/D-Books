import { Cart } from "./CartModel"

export type User = {
  id: string,
  email: string,
  cart: Cart,
  role: 'admin' | 'user'
}