import React, { useState } from "react";
import Layout from "../../Layout/Layouts";
import "../../CSS/admindash.css";
import CategoryModule from "./Category";
import ProductModule from "./Product";
import AllProduct from "./AllProduct";
import AllOrders from "./AllOrders";


const AdminDashboard = () => {
  const [key, setKey] = useState("categories");

  return (
    <Layout title="Admin Dashboard">
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${key === "categories" ? "active" : ""}`}
              onClick={() => setKey("categories")}
            >
              Categories
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${key === "products" ? "active" : ""}`}
              onClick={() => setKey("products")}
            >
              Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${key === "allProducts" ? "active" : ""}`}
              onClick={() => setKey("allProducts")}
            >
              All Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${key === "All Orders" ? "active" : ""}`}
              onClick={() => setKey("All Orders")}
            >
              All Orders
            </button>
          </li>
        </ul>
        <div className="tab-content mt-3">
          {key === "categories" && <CategoryModule />}
          {key === "products" && <ProductModule />}
          {key === "allProducts" && <AllProduct/>}
          {key === "All Orders" && <AllOrders />}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
