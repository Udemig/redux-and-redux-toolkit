import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk('fetchProduct', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response?.json();
  return data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState: {products: [], loading: false, errorMessage: '', count: 0},
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    clearAllProduct: state => {
      state.products = [];
      state.count = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.errorMessage = action.error.message || '';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.count = action.payload?.length;
      });
  },
});

export const {setCount, clearAllProduct} = productSlice.actions;

export default productSlice.reducer;
