import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";
import "../../CSS/allorders.css";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders data from the server
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        {
          params: { authId: auth.user._id },
        }
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const cancelOrder= async (orderId) => {
    console.log(  `${process.env.REACT_APP_API}`);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/orders/${orderId}`,
        { status: "cancelled" }
      );

      if (res) {
        // Assuming fetchOrders is a function available in the current scope
        fetchOrders();
        toast.success("product is cancelled");
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      // Handle error from axios request
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

     
    

  // Filter orders into delivered and upcoming sections
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered" || order.status === "cancelled"
  );
  const upcomingOrders = orders.filter(
    (order) => order.status !== "delivered" && order.status !== "cancelled"
  );

  return (
    <div>
      <h2>Upcoming Orders</h2>
      {loading ? (
        <div className="spinner-container">
          {" "}
          <div className="spinner-container">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : upcomingOrders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No upcoming orders found
        </div>
      ) : (
        upcomingOrders
          .map((order) => (
            <div key={order._id} className="order">
              {/* Render upcoming orders */}
              <h4 className="orderId">Order ID: {order._id}</h4>
              <div className="row">
                {order.products.map((product) => (
                  <div key={product._id} className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="img-fluid"
                          style={{ width: "104px", height: "130px" }}
                        />
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          <h5 className="product-name">{product.name}</h5>
                          <p className="product-description">
                            {product.description}
                          </p>
                          <p className="product-price">
                            Price: ₹{product.price}
                          </p>
                          <p className="product-status">
                            Status: {order.status}
                          </p>
                          <div className="cancel ">
                            <p className="product-orderd">
                              Ordered {moment(order.createdAt).fromNow()}
                            </p>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => cancelOrder(order._id)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
          .reverse() // Reverse the order of upcoming orders
      )}

      <h2>Delivered Orders</h2>
      {loading ? (
        <div className="spinner-container">{/* Loading spinner */}</div>
      ) : deliveredOrders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No delivered orders found
        </div>
      ) : (
        deliveredOrders.map((order) => (
          <div key={order._id} className="order">
            {/* Render delivered orders */}
            <h4 className="orderId">Order ID: {order._id}</h4>
            <div className="row">
              {order.products.map((product) => (
                <div key={product._id} className="col-md-12">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="img-fluid"
                        style={{ width: "104px", height: "130px" }}
                      />
                    </div>
                    <div className="col-md-6 ">
                      <div>
                        <h5 className="product-name">{product.name}</h5>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <p className="product-price">Price: ₹{product.price}</p>
                        <p className="product-status">Status: {order.status}</p>
                        <p className="product-orderd">
                          Ordered {moment(order.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllOrders;
