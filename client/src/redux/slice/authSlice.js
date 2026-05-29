import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      // Backend payload safety validation fallback
      const data = response.data;
      const userPayload = data.user || data; 
      const tokenPayload = data.token;

      if (!tokenPayload) {
        throw new Error("Authentication token missing from server response");
      }

      // Persist values across browser instances
      localStorage.setItem("userInfo", JSON.stringify(userPayload));
      localStorage.setItem("userToken", tokenPayload);

      return userPayload;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async Thunk for User Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );

      const data = response.data;
      const userPayload = data.user || data;
      const tokenPayload = data.token;

      if (!tokenPayload) {
        throw new Error("Registration completed, but token missing from server response");
      }

      localStorage.setItem("userInfo", JSON.stringify(userPayload));
      localStorage.setItem("userToken", tokenPayload);

      return userPayload;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Slice Configuration
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      state.error = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    // Fixed typo from "genarateNewGuestId" to "generateNewGuestId"
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Action Controllers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Registration Action Controllers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;