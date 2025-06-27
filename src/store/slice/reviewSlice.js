import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { notification } from "antd";

// Fetch all reviews
export const fetchAllReviews = createAsyncThunk(
  "review/fetchAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/reviews");
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// Fetch reviews by productId
export const fetchReviewsByProduct = createAsyncThunk(
  "review/fetchReviewsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/reviews/product_review/${productId}`
      );
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// Add a new review
export const addReview = createAsyncThunk(
  "review/addReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/reviews", data);

      notification.success({
        message: "Success",
        description: res?.data?.message || "Review submitted successfully!",
      });

      dispatch(fetchReviewsByProduct(data.productId)); // Refresh reviews list
      return res.data;
    } catch (err) {
      const errorData = err?.response?.data;

      notification.error({
        message: errorData?.error || "Review submission failed",
        // description: errorData?.message || "Something went wrong. Try again.",
      });

      return rejectWithValue(errorData || err);
    }
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ id, productId }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`/reviews/${id}`);
      notification.success({ message: "Review deleted" });
      dispatch(fetchReviewsByProduct(productId));
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

// Slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export default reviewSlice.reducer;
