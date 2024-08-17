import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import Product from "./pages/Product";

import './styles/index.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product/11" element={<Product />} />
				</Routes>
				<Navbar key="footer" footer />
      </Router>
    </div>
  );
}

export default App
