import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ScrollToAnchor from "./utils/scrollToAnchor";
import PageTitle from "./components/page-title/PageTitle";
import NotFound from "./pages/NotFound";

import './styles/index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToAnchor />
        <Navbar />
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
            path="/product/11"
            element={
              <>
                <PageTitle title="Essence Mascara Lash Princess | Goods4you" />
                <Product />
              </>
            }
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
