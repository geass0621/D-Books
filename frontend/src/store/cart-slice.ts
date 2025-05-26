import { Book } from "../models/BookModel";
import { CartItem } from "../models/CartItemsModel";
import { Cart } from "../models/CartModel"

const initialState: Cart = {
  userId: '',
  userEmail: '',
  items: [],
  totalPrice: 0,
  totalQuantity: 0
}

export const cartSlice = {
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItemToCart(state: Cart, action: { payload: Book }) {
      const book = action.payload;
      const discountedPrice = book.price - (book.price * (book.discount / 100));
      const existingItem = state.items.find(item => item.bookId === book.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          bookId: book.id,
          quantity: 1,
          discountPrice: discountedPrice
        } as CartItem);
      }

      state.totalPrice += discountedPrice;
      state.totalQuantity += 1;
    },
    removeItemFromCart(state: Cart, action: { payload: string }) {
      const bookId = action.payload;
      const existingItem = state.items.find(item => item.bookId === bookId);
      if (existingItem) {
        state.totalPrice -= existingItem.discountPrice;
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.bookId !== bookId);
        }
        state.totalQuantity -= 1;
      }
    }
  }

}