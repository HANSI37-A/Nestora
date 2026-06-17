import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; 

// fetch all users {admin only}
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch users");
    }
  }
);

// Add the create user action
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/admin/users", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to create user");
    }
  }
);

// Update user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/admin/users/${id}`, { name, email, role });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update user");
    }
  }
);

// delete a user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/admin/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete user");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload?.user;
        if (updatedUser) {
          const userIndex = state.users.findIndex(
            (user) => user._id === updatedUser._id
          );
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user); 
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default adminSlice.reducer;