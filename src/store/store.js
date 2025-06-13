import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/CartSlice";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";
import ProductReducer from "./slice/productSlice";
import heroReducers from "./slice/heroSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer,
    product: ProductReducer,
    hero: heroReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
