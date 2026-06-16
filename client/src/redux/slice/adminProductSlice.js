import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const getAuthHeaders = () => {
  const userInfoStr = localStorage.getItem("userInfo");
  const token = userInfoStr ? JSON.parse(userInfoStr).token : null;
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch products");
    }
  }
);

// Async function to create a new product 
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/products`,
        productData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to create product");
    }
  }
);

// async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        productData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update product");
    }
  }
);

// async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, getAuthHeaders());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete product");
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    })

    // create product
    .addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    })

    // update product
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if(index !== -1){
        state.products[index] = action.payload;
      }
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    })
    
    // delete product
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
  },
});

export const addProduct = createProduct;

export default adminProductSlice.reducer;