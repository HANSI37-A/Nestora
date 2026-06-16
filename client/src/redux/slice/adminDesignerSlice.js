import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/designers';

// Async Thunks
export const fetchAdminDesigners = createAsyncThunk(
  'adminDesigners/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
     
      const token = getState().auth?.token || getState().auth?.user?.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch designers');
    }
  }
);

export const deleteDesigner = createAsyncThunk(
  'adminDesigners/delete',
  
  async (id, { getState, rejectWithValue }) => {
    try {
      
      const token = getState().auth?.token || getState().auth?.user?.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.delete(`${API_URL}/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete designer');
    }
  }
);

const adminDesignerSlice = createSlice({
  name: 'adminDesigners',
  initialState: {
    designers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Layout Cases
      .addCase(fetchAdminDesigners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDesigners.fulfilled, (state, action) => {
        state.loading = false;
        state.designers = action.payload;
      })
      .addCase(fetchAdminDesigners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Layout Cases
      .addCase(deleteDesigner.fulfilled, (state, action) => {
        state.designers = state.designers.filter((d) => d._id !== action.payload);
      });
  },
});

export default adminDesignerSlice.reducer;