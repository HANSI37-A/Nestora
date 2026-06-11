import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/designers";

export const fetchDesigners = createAsyncThunk("designers/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const updateDesigner = createAsyncThunk("designers/updateOne", async ({ id, designerData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth?.token || thunkAPI.getState().auth?.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const response = await axios.put(`${API_URL}/${id}`, designerData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const designerSlice = createSlice({
  name: "designers",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reducers
      .addCase(fetchDesigners.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDesigners.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchDesigners.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // Update Reducers
      .addCase(updateDesigner.fulfilled, (state, action) => {
        const index = state.list.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default designerSlice.reducer;