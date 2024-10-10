import { CartItem } from '@/types/cartType';
import { create } from 'zustand';
import {
  calculateTotal,
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
} from './cartUtils';

interface CartState {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
  removeCartItem: (itemId: string, userId: string) => void;
  changeCartItemCount: (itemId: string, count: number, userId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  totalCount: 0,
  totalPrice: 0,
  initCart: (userId) => {
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },
  resetCart: (userId) => {
    resetCartAtLocalStorage(userId),
      set({
        cart: [],
        totalCount: 0,
        totalPrice: 0,
      });
  },
  addCartItem: (item, userId, count) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart;
      // 카트가 존재하면 수량 추가
      if (existingItemIndex !== -1) {
        updatedCart = [...state.cart];
        updatedCart[existingItemIndex].count += count;
      } else {
        // 새로운 아이템을 추가
        updatedCart = [...state.cart, { ...item, count }];
      }

      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(state.cart, userId);

      // 최신 상태로 변환
      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
  removeCartItem: (itemId, userId) => {
    set((state) => {
      const updatedCart = state.cart.filter((Item) => Item.id !== itemId);

      const total = calculateTotal(state.cart);
      setCartToLocalStorage(state.cart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
  changeCartItemCount: (itemId, count, userId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId ? { ...item, count } : item
      );
      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
}));
