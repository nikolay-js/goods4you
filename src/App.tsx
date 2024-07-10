import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ScrollToAnchor from "./utils/scrollToAnchor";

import './styles/index.css'

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToAnchor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/11" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Navbar key="footer" footer />
      </Router>
    </div>
  );
}

export default App
