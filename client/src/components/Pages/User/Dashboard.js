import React, { useState } from "react";
import Layout from "../../Layout/Layouts";
import "../../CSS/dashboard.css";
import AllOrders from "./AllOrders";
import UpdateProfile from "./UpdateProfile";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("AllOrders");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Layout title="User Dashboard">
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "AllOrders" ? "active" : ""
              }`}
              onClick={() => handleTabClick("AllOrders")}
            >
              All Orders
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "UpdateProfile" ? "active" : ""
              }`}
              onClick={() => handleTabClick("UpdateProfile")}
            >
              Update Profile
            </button>
          </li>
        </ul>
        <div className="tab-content mt-3">
          {activeTab === "AllOrders" && <AllOrders />}
          {activeTab === "UpdateProfile" && <UpdateProfile />}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
