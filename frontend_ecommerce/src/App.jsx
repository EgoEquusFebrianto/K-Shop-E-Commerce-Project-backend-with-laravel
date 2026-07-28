import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Testing } from "./Testing";
import { LoginPage } from "./pages/login/LoginPage";
import { Orders } from "./pages/order/Orders";
import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage state={false} />} />
        <Route path="/register" element={<LoginPage state={true} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AppContent />
    </Router>
  );
}

export default App;