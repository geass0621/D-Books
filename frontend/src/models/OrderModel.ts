import { Book } from "./BookModel"

type Order = {
  items: Book[],
  address: String,
  userName: String,
  userId: String,
  status: 'Ongoing' | 'Delivered',
  totalAmount: Number
}