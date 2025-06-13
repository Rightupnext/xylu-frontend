import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { notification } from "antd";

// 1. Fetch all categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/categories");
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 2. Add a new category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/categories", data);
      notification.success({ message: "Category added successfully" });
      dispatch(fetchCategories());
      return res;
    } catch (err) {
      notification.error({
        message: "Add failed",
        description: err?.response?.data?.message,
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 3. Update a category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.put(`/categories/${id}`, data);
      notification.success({ message: "Category updated" });
      dispatch(fetchCategories());
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

// 4. Delete a category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      notification.success({ message: "Category deleted" });
      dispatch(fetchCategories());
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load categories";
      })

      // Add
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = {
            ...state.categories[index],
            ...action.payload,
          };
        }
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
