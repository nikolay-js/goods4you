import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types";

interface ICart {
  discountedTotal: number;
  id: number; 
  products: Array<IProduct>;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
};

interface ICartState {
  carts: Array<ICart>;
  isLoading: boolean;
  error: string;
};

const initialState: ICartState = {
  carts: [],
  isLoading: false,
  error: '',
};

export const fetchUserCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/33`)
      return await response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  },
)

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.carts = action.payload;
    })
    .addCase(fetchUserCart.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchUserCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.payload)
    })
  },
});

export default cartSlice.reducer;