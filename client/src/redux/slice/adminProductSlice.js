import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; 

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch products");
    }
  }
);

// Create a new product 
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/products", productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to create product");
    }
  }
);

// Update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update product");
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
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
      // Fetch products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        
        state.products = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.products || [];
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        
        const newProduct = action.payload?._id ? action.payload : action.payload?.product;
        if (newProduct) {
          state.products.push(newProduct);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload?._id ? action.payload : action.payload?.product;
        
        if (updatedProduct) {
          const index = state.products.findIndex(
            (product) => product._id === updatedProduct._id
          );
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      // Delete product
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