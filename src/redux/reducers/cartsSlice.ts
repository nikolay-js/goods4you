import { createSlice, createAsyncThunk, PayloadAction, current } from "@reduxjs/toolkit";
import { IProduct, IUser } from "../../types";

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
  userId: number,
  isLoading: boolean;
  error: string;
};

const initialState: ICartState = {
  carts: [],
  userId: undefined,
  isLoading: false,
  error: '',
};

export const fetchUserCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: number, thunkAPI) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/${userId}`)
      return await response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async ({ cartId, product }: { cartId: number, product: IProduct }, { rejectWithValue }) => {
    const { id } = product;
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merge: false, // this will include existing products in the cart
          products: [
            {
              id,
              quantity: 1,
            },
          ]
        })
      });
      return await response.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "cart/updateProduct",
  async ({ cartId, product, dec }: { cartId: number, product: IProduct, dec?: boolean }, { rejectWithValue }) => {
    const { id, quantity } = product;
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merge: false, // this will include existing products in the cart
          products: [
            {
              id,
              quantity,
            },
          ]
        })
      });
      return await response.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async ({ cartId, product }: { cartId: number, product: IProduct }, { rejectWithValue }) => {
    const { id } = product;
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merge: false, // this will include existing products in the cart
          products: [
            {
              id,
            },
          ]
        })
      });
      return await response.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.carts = action.payload.carts;
      })
      .addCase(fetchUserCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload)
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<ICart>) => {
        state.isLoading = false;
        state.error = '';
        state.carts[0].products = state.carts[0].products.concat(action.payload.products);
        state.carts[0].total += action.payload.total;
        state.carts[0].discountedTotal += action.payload.discountedTotal;
        state.carts[0].totalProducts += action.payload.totalProducts;
        state.carts[0].totalQuantity += action.payload.totalQuantity;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        const {
          arg: { dec, product: { id } },
        } = action.meta;
        if (!dec) {
          state.carts[0].products.find(product => product.id === id).quantity += action.payload.products[0].quantity;
          state.carts[0].total += action.payload.total;
          state.carts[0].discountedTotal += action.payload.discountedTotal;
          state.carts[0].totalQuantity += action.payload.totalQuantity;
        } else {
          state.carts[0].products.find(product => product.id === id).quantity -= action.payload.products[0].quantity;
          state.carts[0].total -= action.payload.total;
          state.carts[0].discountedTotal -= action.payload.discountedTotal;
          state.carts[0].totalQuantity -= action.payload.totalQuantity;
          if (state.carts[0].products.find(product => product.id === id).quantity === 0) {
            state.carts[0].totalProducts -= 1;
            state.carts[0].products.pop();
          }
        }
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload)
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        const {
          arg: { product: { id } },
        } = action.meta;
        if (id) {
          state.carts[0].products = state.carts[0].products.filter((item) => item.id !== id);
        }
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload)
      })
  },
});

export const { setUserId } = cartSlice.actions;

export default cartSlice.reducer;
