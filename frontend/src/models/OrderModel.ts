import { Book } from "./BookModel"

type Order = {
  items: Book[],
  address: string,
  userName: string,
  userId: string,
  status: 'Ongoing' | 'Delivered',
  totalAmount: number
}