import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('fetchProduct', async () => {
  const response = await axios.get('https://fakestoreapi.com/carts/5');

  return response;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {carts: []},
  reducers: {},
});

export default cartSlice.reducer;
