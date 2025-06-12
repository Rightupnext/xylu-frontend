import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { notification } from "antd";

// 1. Fetch all products with variants
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products");
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 2. Add a new product with variants
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({ message: "Product added successfully" });
      return res.data;
    } catch (err) {
      const errorData = err?.response?.data;

      notification.error({
        message: errorData?.error || "Failed to add product",
        description: errorData?.message || "Something went wrong.",
      });

      return rejectWithValue(errorData || err);
    }
  }
);

// 3. Update a product and its variants
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({ message: "Product updated" });
      return { id, ...data };
    } catch (err) {
      notification.error({
        message: "Update failed",
        description: err?.response?.data?.message,
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 4. Delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      notification.success({ message: "Product deleted" });
      return id;
    } catch (err) {
      notification.error({
        message: "Delete failed",
        description: err?.response?.data?.message,
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);
// 5. Get a product by ID
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      notification.error({
        message: "Fetch failed",
        description: err?.response?.data?.message || "Failed to fetch product",
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    selectedProduct: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      })

      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload,
          };
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      // Inside extraReducers
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
        state.selectedProduct = null;
      });
  },
});

export default productSlice.reducer;
