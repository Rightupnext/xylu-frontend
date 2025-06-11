import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/CartSlice";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer,
  },
});
