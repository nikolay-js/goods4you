import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";

import './styles/index.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Home />
				<Navbar key="footer" footer />
      </Router>
    </div>
  );
}

export default App
