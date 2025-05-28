import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../models/BookModel";
import { CartItem } from "../models/CartItemsModel";
import { Cart } from "../models/CartModel"
import { RootState } from "./store";

const initialState: Cart = {
  userId: '',
  userEmail: '',
  items: [],
  totalPrice: 0,
  totalQuantity: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItemToCart(state: Cart, action: { payload: Book }) {
      const book = action.payload;
      const discountedPrice = book.price - (book.price * (book.discount));
      const existingItem = state.items.find(item => item.bookId === book.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          bookId: book.id,
          quantity: 1,
          discountPrice: discountedPrice,
          name: book.name,
          imageUrl: book.imageUrl,
        } as CartItem);
      }

      state.totalPrice += discountedPrice;
      state.totalQuantity += 1;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    incrementItemQuantity(state: Cart, action: { payload: string }) {
      const bookId = action.payload;
      const existingItem = state.items.find(item => item.bookId === bookId);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPrice += existingItem.discountPrice;
        state.totalQuantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementItemQuantity(state: Cart, action: { payload: string }) {
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
      if (state.totalPrice < 0.01) state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
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
      if (state.totalPrice < 0.01) state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    setCart(state: Cart, action: { payload: Cart }) {
      const cart = action.payload;
      state.userId = cart.userId;
      state.userEmail = cart.userEmail;
      state.items = cart.items;
      state.totalPrice = cart.totalPrice;
      state.totalQuantity = cart.totalQuantity;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
})

export const cartActions = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;