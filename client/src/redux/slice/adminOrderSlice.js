import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/orders");
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);

// delete an order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/orders/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        const orderList = Array.isArray(action.payload) ? action.payload : [];
        state.orders = orderList;
        state.totalOrders = orderList.length;

        // calculate total sales
        const totalSales = orderList.reduce((acc, order) => {
          return acc + (order.totalPrice || 0);
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      })

      // update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updateOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updateOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updateOrder;
        }
      })
      // delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.totalOrders = state.orders.length;
      });
  },
});

export default adminOrderSlice.reducer;