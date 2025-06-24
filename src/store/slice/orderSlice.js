import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { notification } from "antd";

// 1. Fetch all orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/get-all-order");
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 2. Create an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/create-order", data);
      notification.success({ message: "Order created successfully" });
      dispatch(fetchOrders());
      return res;
    } catch (err) {
      notification.error({
        message: "Order creation failed",
        description: err?.response?.data?.error,
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 3. Confirm order
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (paymentDetails, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/confirm-order", {
        paymentDetails,
      });
      notification.success({ message: "Payment confirmed" });
      dispatch(fetchOrders());
      return res;
    } catch (err) {
      notification.error({
        message: "Payment confirmation failed",
        description: err?.response?.data?.error,
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 4. Get user ID by order
export const getUserIdByOrder = createAsyncThunk(
  "order/getUserIdByOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/order/get-useridby-order?customer_id=${orderId}`
      );
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);
export const adminUpdateOrder = createAsyncThunk(
  "order/adminUpdateOrder",
  async (
    {
      id,
      deliveryman_name,
      deliveryman_phone,
      otp,
      order_status,
      admin_issue_returnReply,
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axiosInstance.put(`/order/admin-update-order/${id}`, {
        id,
        deliveryman_name,
        deliveryman_phone,
        otp,
        order_status,
        admin_issue_returnReply,
      });

      notification.success({
        message: "Admin updated the order successfully",
        description: res?.data?.message || "Order updated successfully.",
      });

      dispatch(fetchOrders());
      return res;
    } catch (err) {
      notification.error({
        message: "Order update failed",
        description:
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

export const clientUpdateOrderIssue = createAsyncThunk(
  "order/clientUpdateOrderIssue",
  async (
    { id, issue_type, issue_description },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axiosInstance.put(`/order/client-update-order/${id}`, {
        issue_type,

        issue_description,
      });

      notification.success({
        message: "Successfully Updated",
        description: res?.data?.message,
      });

      dispatch(fetchOrders());
      return res;
    } catch (err) {
      notification.error({
        message: "Client update failed",
        description: err?.response?.data?.error || "Something went wrong",
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })

      // Create order
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })

      // Confirm order
      .addCase(confirmOrder.fulfilled, (state, action) => {})

      // Get user ID by order
      .addCase(getUserIdByOrder.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })

      .addCase(adminUpdateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id 
        );
      })

      .addCase(clientUpdateOrderIssue.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      });
  },
});

export default orderSlice.reducer;
