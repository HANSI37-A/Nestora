import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchDesigners = createAsyncThunk(
  "designers/fetchDesigners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/designers");
      
      if (response.data && response.data.data) {
        return response.data.data;
      }
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const designerSlice = createSlice({
  name: "designers",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesigners.fulfilled, (state, action) => {
        state.loading = false;
        
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchDesigners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default designerSlice.reducer;