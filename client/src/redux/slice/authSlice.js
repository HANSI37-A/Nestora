import  { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") ?
 JSON.parse(localStorage.getItem("userInfo")) : null;

// Check for an existing guest ID in the localStorage or generate a new One
const initialGuestId =
 localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue}) =>{
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData
      );
      localStorage.setItem("userInfo", JSON.stringify(resumeAndPrerenderToNodeStream.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user; //Return the user abject from the response

    } catch (error){
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
  return rejectWithValue({ message: errorMessage });
    }
  }
);


// Async Thunk for User Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue}) =>{
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData
      );
      localStorage.setItem("userInfo", JSON.stringify(resumeAndPrerenderToNodeStream.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user; //Return the user abject from the response

    } catch (error){
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
  return rejectWithValue({ message: errorMessage });
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) =>{
      state.user = null;
      state.geustId = `guest_${new Date().getTime()}`; // Reset guest ID on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("gueesId", state.guestId); // Set new guest ID in localStorage
    },
    genarateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(loginUser.pending, (state) =>{
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) =>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) =>{
      state.loading = false;
      state.error = action.payload?.message || "Login failed";
      
    })
    .addCase(registerUser.pending, (state) =>{
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) =>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) =>{
      state.loading = false;
      state.error = action.payload?.message || "Registration failed";
    })
  },
});

export const { logout, genarateNewGuestId } = authSlice.actions;
export default authSlice.reducer;