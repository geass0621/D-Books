import { Book } from "./BookModel"

export type Cart = {
  userId: String,
  userName: String,
  address: String,
  items: Book[],
  totalPrice: Number
}