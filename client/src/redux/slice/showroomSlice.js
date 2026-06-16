import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

// Get auth token helper
const getAuthConfig = () => {
  const userInfoStr = localStorage.getItem("userInfo");
  const token = userInfoStr ? JSON.parse(userInfoStr).token : null;
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Async Thunks
export const fetchAdminShowrooms = createAsyncThunk(
  "showrooms/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/showrooms`, getAuthConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch showroom database collection");
    }
  }
);

export const fetchShowroomById = createAsyncThunk(
  "showrooms/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/showrooms/${id}`, getAuthConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch individual spatial parameters");
    }
  }
);

export const addShowroom = createAsyncThunk(
  "showrooms/add",
  async (showroomData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/showrooms`, showroomData, getAuthConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to finalize spatial database instantiation");
    }
  }
);

export const updateShowroom = createAsyncThunk(
  "showrooms/update",
  async ({ id, showroomData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/admin/showrooms/${id}`, showroomData, getAuthConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to patch target showroom configuration metrics");
    }
  }
);

export const deleteShowroom = createAsyncThunk(
  "showrooms/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/admin/showrooms/${id}`, getAuthConfig());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete target structural entry");
    }
  }
);

const showroomSlice = createSlice({
  name: "showrooms",
  initialState: {
    showrooms: [],
    currentShowroom: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearShowroomErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin List
      .addCase(fetchAdminShowrooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminShowrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.showrooms = action.payload;
      })
      .addCase(fetchAdminShowrooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Instance
      .addCase(fetchShowroomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowroomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShowroom = action.payload;
      })
      .addCase(fetchShowroomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Showroom
      .addCase(addShowroom.fulfilled, (state, action) => {
        state.showrooms.unshift(action.payload);
      })
      // Update Showroom
      .addCase(updateShowroom.fulfilled, (state, action) => {
        const index = state.showrooms.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.showrooms[index] = action.payload;
        }
        if (state.currentShowroom?._id === action.payload._id) {
          state.currentShowroom = action.payload;
        }
      })
      // Delete Showroom
      .addCase(deleteShowroom.fulfilled, (state, action) => {
        state.showrooms = state.showrooms.filter((s) => s._id !== action.payload);
      });
  },
});

export const { clearShowroomErrors } = showroomSlice.actions;
export default showroomSlice.reducer;