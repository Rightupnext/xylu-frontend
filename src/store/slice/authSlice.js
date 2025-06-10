// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { token } from "../../auth/index";
import { notification } from "antd";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);

      if (res.token) {
        token.set(res.token);
        localStorage.setItem("xylu-user", JSON.stringify(res.user));
        notification.success({
          message: "Login Successful",
          description: `Welcome, ${res.user?.username || "User"}`,
        });
      }

      return res;
    } catch (err) {
      notification.error({
        message: "Login Failed",
        description: err?.response?.data?.message || "Something went wrong",
      });
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);

      notification.success({
        message: "Registration Successful",
        description: "You can now login with your credentials.",
      });

      return res;
    } catch (err) {
      notification.error({
        message: "Registration Failed",
        description: err?.response?.data?.message || "Something went wrong",
      });
      return rejectWithValue(err.response?.data || err);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("xylu-user")) || null,
  loading: false,
  error: null,
  isAuthenticated: !!token.get(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      token.remove();
      localStorage.removeItem("xylu-user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // Don't set isAuthenticated — user must log in after registering
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
