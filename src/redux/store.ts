import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartsSlice';
import { productsApi } from "./services/productsApi";
import { authApi } from './services/authApi';

export const store = configureStore({
  reducer: {
    cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    productsApi.middleware,
    authApi.middleware
  ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
