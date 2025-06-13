import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const addToCartThunk = createAsyncThunk(
  "cart/addToCartThunk",
  async ({ product, selectedColor, selectedSize, quantity }, { dispatch }) => {
    if (!selectedColor || !selectedSize) {
      notification.error({
        message: "Selection required",
        description: "Please select both color and size before adding to cart.",
      });

      throw new Error("Color and size selection required");
    }

    dispatch(addToCart({ product, selectedColor, selectedSize, quantity }));
    notification.open({
      type: "success",
      message: "Added to cart",
      description: `${product.product_name} has been added to your cart.`,
    });
  }
);
export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCartThunk",
  async (index, { dispatch, getState }) => {
    const removedItem = getState().cart.items[index];

    if (removedItem) {
      dispatch(removeFromCart(index));
      notification.warning({
        message: "Item Removed",
        description: `${removedItem.product_name} has been removed from your cart.`,
      });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, selectedColor, selectedSize, quantity } = action.payload;

      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex !== -1) {
        // Increase quantity by selected amount
        state.items[existingIndex].quantity += quantity || 1;
      } else {
        // Add new item with specified quantity
        state.items.push({
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          tag: product.tag,
          product_code:product.product_code,
          discount:product.discount,
          selectedColor,
          selectedSize,
          quantity: quantity || 1,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity(state, action) {
      const { index, delta } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity = Math.max(
          1,
          state.items[index].quantity + delta
        );
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action) {
      const removedItem = state.items[action.payload];
      state.items.splice(action.payload, 1);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
