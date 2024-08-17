import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useEffect, useState } from "react";
import { fetchUserCart } from "./redux/reducers/cartsSlice";

import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ScrollToAnchor from "./utils/scrollToAnchor";
import PageTitle from "./components/page-title/PageTitle";
import NotFound from "./pages/NotFound";

import './styles/index.css';

function App() {
  const dispatch = useAppDispatch();
  const { carts, isLoading, error } = useAppSelector((state) => state.cartReducer);
  const cart = carts?.carts?.[0] ?? [];
  const { totalQuantity = '' } = cart;

  useEffect(() => {
    dispatch(fetchUserCart());
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>Is loading...</h1>}
      {error && <h1>{error}</h1>}
      <Router>
        <ScrollToAnchor />
        <Navbar totalQuantity={totalQuantity} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Catalog | Goods4you" />
                <Home />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={<Product />}
          />
          <Route
            path="/cart"
            element={
              <>
                <PageTitle title="My cart | Goods4you" />
                <Cart cart={cart} />
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <PageTitle title="404 | Page not found" />
                <NotFound />
              </>
            }
          />
        </Routes>
        <Navbar key="footer" footer />
      </Router>
    </div>
  );
}

export default App
