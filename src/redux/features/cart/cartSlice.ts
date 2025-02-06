import { RootState } from '@/redux/store';
import { Extra, Size, Dough } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  dough?: Dough;
  extras?: Extra[];
};

type CartState = {
  items: CartItem[];
};

// Initialize cart items safely for SSR
const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  }
  return []; // Return empty array during SSR
};

const initialState: CartState = {
  items: getInitialCartItems(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.dough = action.payload.dough;
        existingItem.extras = action.payload.extras;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Save updated cart to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
      // Save updated cart to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      // Save updated cart to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cartItems');
      }
    },
  },
});

export const { addCartItem, removeCartItem, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
