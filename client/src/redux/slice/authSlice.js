import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; 

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

if (localStorage.getItem("userToken")) {
  localStorage.removeItem("userToken");
}

const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  token: userFromStorage?.token || null, 
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", userData);
      const data = response.data;
  
      const userPayload = data.user ? { ...data.user } : { ...data };
      const tokenPayload = data.token || data.user?.token;

      if (!tokenPayload) {
        throw new Error("Authentication token missing from server response");
      }

      userPayload.token = tokenPayload;
      
      localStorage.setItem("userInfo", JSON.stringify(userPayload));
      return userPayload;

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async Thunk for User Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/register", userData);
      const data = response.data;
      
      const userPayload = data.user ? { ...data.user } : { ...data };
      const tokenPayload = data.token || data.user?.token;

      if (!tokenPayload) {
        throw new Error("Registration completed, but token missing from server response");
      }

      userPayload.token = tokenPayload;

      localStorage.setItem("userInfo", JSON.stringify(userPayload));
      return userPayload;

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
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
      state.token = null; 
      state.guestId = `guest_${new Date().getTime()}`;
      state.error = null;
      localStorage.removeItem("userInfo");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    updateAuthUser: (state, action) => {
      const currentToken = state.user?.token || state.token;
      
      state.user = {
        ...state.user,
        ...action.payload,
        token: action.payload?.token || currentToken,
      };
      
      state.token = state.user.token;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      
      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload?.token || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { logout, generateNewGuestId, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;