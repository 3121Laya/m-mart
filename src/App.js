import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Products from "./components/Products";
import ProductInfo from "./components/ProductInfo";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductManagement from "./components/ProductManagement";  // Admin page
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import UserManagement from './components/UserManagement';
import OrderHistory from './components/OrderHistory';
import AllProduct from "./components/admin/AllProduct";
import AddProducts from "./components/admin/AddProducts";
import UsersList from "./components/admin/UsersList";
import UserInfo from "./components/admin/UserInfo";
import Orders from "./components/Orders";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header /> {/* Header now handles the conditional role-based rendering */}
          
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Private Routes (require authentication) */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/products/:id" element={<PrivateRoute><ProductInfo /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />

            {/* Admin Routes (require admin role) */}
            <Route path="/admin/all-products" element={<RoleBasedRoute requiredRole="admin"><AllProduct /></RoleBasedRoute>} />
            <Route path="/admin/add-product" element={<RoleBasedRoute requiredRole="admin"><AddProducts /></RoleBasedRoute>} />
            <Route path="/admin/users" element={<RoleBasedRoute requiredRole="admin"><UsersList /></RoleBasedRoute>} />
            <Route path="/admin/users/:id" element={<RoleBasedRoute requiredRole="admin"><UserInfo /></RoleBasedRoute>} />

            {/* Default Route */}
            {/* <Route path="/" element={<Navigate to="/home" />} /> */}

            {/* Other routes */}
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>

          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
