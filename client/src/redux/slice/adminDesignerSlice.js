import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const getAuthHeaders = () => {
  const userInfoStr = localStorage.getItem("userInfo");
  const token = userInfoStr ? JSON.parse(userInfoStr).token : null;
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  };
};

// Async Thunks
export const fetchAdminDesigners = createAsyncThunk(
  'adminDesigners/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/designers`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch designers');
    }
  }
);

export const addDesigner = createAsyncThunk(
  'adminDesigners/add',
  async (designerData, { rejectWithValue }) => {
    try {
    
      const response = await axios.post(`${API_URL}/api/admin/designers`, designerData, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add designer');
    }
  }
);

export const fetchDesignerById = createAsyncThunk(
  'adminDesigners/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/designers/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch designer details');
    }
  }
);

export const updateDesigner = createAsyncThunk(
  'adminDesigners/update',
  async ({ id, designerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/admin/designers/${id}`, designerData, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update designer');
    }
  }
);

export const deleteDesigner = createAsyncThunk(
  'adminDesigners/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/designers/${id}`, getAuthHeaders());
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
    currentDesigner: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Designers
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

      .addCase(fetchDesignerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDesigner = action.payload;
      })
      .addCase(fetchDesignerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Designer
      .addCase(addDesigner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDesigner.fulfilled, (state, action) => {
        state.loading = false;
        state.designers.push(action.payload);
      })
      .addCase(addDesigner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Designer
      .addCase(updateDesigner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDesigner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.designers.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.designers[index] = action.payload;
        }
        if (state.currentDesigner?._id === action.payload._id) {
          state.currentDesigner = action.payload;
        }
      })
      .addCase(updateDesigner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Designer
      .addCase(deleteDesigner.fulfilled, (state, action) => {
        state.designers = state.designers.filter((d) => d._id !== action.payload);
      });
  },
});

export default adminDesignerSlice.reducer;