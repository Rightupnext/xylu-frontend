import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/CartSlice";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";
import ProductReducer from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer,
    product: ProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
