import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUserCart } from "./redux/reducers/cartsSlice";

import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ScrollToAnchor from "./utils/scrollToAnchor";
import PageTitle from "./components/page-title/PageTitle";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import './styles/index.css';

function App() {
  const dispatch = useAppDispatch();
  const { carts, user = {}, isLoading, error } = useAppSelector((state) => state.cartReducer);
  const cart = carts?.[0] ?? [];
  const { totalProducts = '' } = cart;
  const { id: userId, firstName, lastName } = user;
  const me = JSON.parse(localStorage.getItem('goods4you') || '{}');
  const isMe = Object.keys(me).length > 0;
  const [isAuth, setIsAuth] = useState<boolean>(isMe);

  useEffect(() => {
    if (isMe && isAuth && userId) dispatch(fetchUserCart(userId));
  }, [isMe, isAuth, userId]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <div className="App">
      <Router>
        <ScrollToAnchor />
        <Navbar totalProducts={totalProducts} firstName={firstName} lastName={lastName} />
        <Routes>
          {(!isMe || !isAuth) && <Route
            path="/login"
            element={
              <>
                <PageTitle title="Sign in | Goods4you" />
                <Login setIsAuth={setIsAuth} />
              </>
            }
          />}
          <Route element={<PrivateRoute me={me} isMe={isMe} isAuth={isAuth} setIsAuth={setIsAuth} />}>
            <Route
              path="/"
              element={
                <>
                  <PageTitle title="Catalog | Goods4you" />
                  <Home me={me} isMe={isMe} />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={<Product me={me} isMe={isMe} />}
            />
            <Route
              path="/cart"
              element={
                <>
                  <PageTitle title="My cart | Goods4you" />
                  <Cart />
                </>
              }
            />
          </Route>
          <Route
            path="/*"
            element={
              <>
                <PageTitle title="404 | Page not found" />
                <NotFound />
              </>
            }
          />
          <Route path="/login" element={<Navigate to="/" />} />
        </Routes>
        <footer>
          <Navbar key="footer" footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
