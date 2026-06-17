import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; 

// Async Thunk to fetch user orders history
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/orders/my-orders");
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to load orders history array.";
      return rejectWithValue(msg);
    }
  }
);

// Async Thunk to fetch specific order details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to load specific target order data.";
      return rejectWithValue(msg);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Fetch User Orders History
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;