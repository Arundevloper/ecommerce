import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePages from "./components/Pages/Home";
import Contact from "./components/Pages/contact";
import Policy from "./components/Pages/Policy";
import About from "./components/Pages/About";
import Pagenotfound from "./components/Pages/Pagenotfound";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
import Search from "./components/Pages/Search";
import ProductDeatails from "./components/Pages/ProductDeatails";
import CartPages from "./components/Pages/CartPages";
import CategoriesPage from "./components/Pages/CategoriesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/product/:slug" element={<ProductDeatails />} />
        <Route path="/category/:slug" element={<CategoriesPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Toaster /> {/* Render the Toaster component */}
    </>
  );
}

export default App;
