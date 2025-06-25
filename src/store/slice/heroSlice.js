import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { notification } from "antd";

// 1. Fetch all hero images
export const fetchHeroes = createAsyncThunk(
  "hero/fetchHeroes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/hero/get-heroes");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 2. Upload a new hero image
export const uploadHeroImage = createAsyncThunk(
  "hero/uploadHeroImage",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/hero/upload-hero", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({ message: "Hero image uploaded successfully" });
      dispatch(fetchHeroes()); // Refresh after upload
      return res.data;
    } catch (err) {
      notification.error({
        message: "Upload failed",
        description: err?.response?.data?.message || "Failed to upload image",
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);
export const updateHeroImage = createAsyncThunk(
  "hero/updateHeroImage",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      // Use PUT (or PATCH if your backend prefers)
      const res = await axiosInstance.put(`/hero/update-hero/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({ message: "Hero image updated successfully" });
      dispatch(fetchHeroes()); // Refresh after update
      return res.data;
    } catch (err) {
      notification.error({
        message: "Update failed",
        description: err?.response?.data?.message || "Failed to update image",
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

// 3. Delete a hero image
export const deleteHeroImage = createAsyncThunk(
  "hero/deleteHeroImage",
  async (filename, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`/hero/delete-hero/${filename}`);
      notification.success({ message: "Hero image deleted successfully" });
      dispatch(fetchHeroes()); // Refresh after delete
      return filename;
    } catch (err) {
      notification.error({
        message: "Delete failed",
        description: err?.response?.data?.message || "Failed to delete image",
      });
      return rejectWithValue(err?.response?.data || err);
    }
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState: {
    heroImages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroImages = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load hero images";
      })

      .addCase(uploadHeroImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadHeroImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadHeroImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to upload hero image";
      })

      .addCase(deleteHeroImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHeroImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteHeroImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete hero image";
      })
      .addCase(updateHeroImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHeroImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateHeroImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update hero image";
      });
  },
});

export default heroSlice.reducer;
