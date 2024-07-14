import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartsSlice';
import { productsApi } from "./services/productsApi";

export const store = configureStore({
  reducer: {
    cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
