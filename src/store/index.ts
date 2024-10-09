import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import filterReducer from "./filter/filterSlice";
import productsReducer from "./product/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
