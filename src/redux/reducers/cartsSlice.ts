import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  user: IUser,
  isLoading: boolean;
  error: string;
};

const initialState: ICartState = {
  carts: [],
  user: undefined,
  isLoading: false,
  error: '',
};

const token = JSON.parse(localStorage.getItem('goods4you') || '{}');

export const fetchUserCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: number, thunkAPI) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      return await response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async ({ cartId, productId }: { cartId: number, productId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          merge: false, // this will include existing products in the cart
          products: [
            {
              id: productId,
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
  async ({ cartId, productId, dec }: { cartId: number, productId: number, dec?: boolean }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          merge: false, // this will include existing products in the cart
          products: [
            {
              id: productId,
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

export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async ({ cartId, productId }: { cartId: number, productId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          merge: false, // this will include existing products in the cart
          products: [
            {
              id: productId,
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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
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
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        const {
          arg: { productId: id },
        } = action.meta;
        let product = state.carts[0].products.find(product => product.id === id);
        if (product?.quantity === 0) {
          product.quantity += action.payload.products[0].quantity;
          product.total += action.payload.products[0].total;
          product.discountPercentage += action.payload.products[0].discountPercentage;
          product.discountedTotal += action.payload.products[0].discountedPrice;
        } else {
          state.carts[0].products = state.carts[0].products.concat({ discountedTotal: action.payload.products[0].discountedPrice, ...action.payload.products[0] });
        }
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
          arg: { dec, productId: id },
        } = action.meta;
        let product = state.carts[0].products.find(product => product.id === id);
        if (!dec) {
          product.quantity += action.payload.products[0].quantity;
          product.total += action.payload.products[0].total;
          product.discountPercentage += action.payload.products[0].discountPercentage;
          product.discountedTotal += action.payload.products[0].discountedPrice;
          state.carts[0].total += action.payload.total;
          state.carts[0].discountedTotal += action.payload.discountedTotal;
          state.carts[0].totalQuantity += action.payload.totalQuantity;
        } else {
          product.quantity -= action.payload.products[0].quantity;
          product.total -= action.payload.products[0].total;
          product.discountPercentage -= action.payload.products[0].discountPercentage;
          product.discountedTotal -= action.payload.products[0].discountedPrice;
          state.carts[0].total -= action.payload.total;
          state.carts[0].discountedTotal -= action.payload.discountedTotal;
          state.carts[0].totalQuantity -= action.payload.totalQuantity;
          if (product.quantity === 0) state.carts[0].totalProducts -= 1;
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
          arg: { productId: id },
        } = action.meta;
        let product = state.carts[0].products.find(product => product.id === id);
        if (id) {
          state.carts[0].total -= product.total;
          state.carts[0].discountedTotal -= product.discountedTotal;
          state.carts[0].totalProducts -= 1;
          state.carts[0].totalQuantity -= product.quantity;
          product.quantity = 0;
          product.total = 0;
          product.discountPercentage = 0;
          product.discountedTotal = 0;
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

export const { setUser } = cartSlice.actions;

export default cartSlice.reducer;
