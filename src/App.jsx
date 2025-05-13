import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails"; // Add this import
import Contacts from "./pages/Contacts";
import Faq from "./pages/FAQ";
import WhyVelora from "./pages/WhyVelora.jsx";
import Footer from "./components/Footer";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./routes/PrivateRoutes";
import Unauthorized from "./pages/Unauthorized";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/admin/Dashboard.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/whyvelora" element={<WhyVelora />} />
        <Route path="/products/:id" element={<ProductDetails />} />{" "}
        {/* Add product details route */}
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<Products />} />
          {/* Add other protected routes here */}
        </Route>
        {/* Admin-only routes */}
        {/* <Route element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
