import { Book } from "./BookModel"

export type Cart = {
  userId: string,
  userName: string,
  address: string,
  items: Book[],
  totalPrice: number
}