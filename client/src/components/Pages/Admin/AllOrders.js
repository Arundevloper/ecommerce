import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to format the date to show how long ago the order was placed
  const formatDate = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    if (minutes < 60) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${hours} hour(s) ago`;
    }
  };

  // Function to handle status change
  const handleStatusChange = async (orderId, status) => {
    try {
    const res=  await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status,
        }
      );

      if(res){
            fetchOrders();
        toast.success("Updated the status");
      }
      else{
 toast.error("an error came");
      }
     
      // If successful, you may want to update the orders state or display a success message
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error, display error message, etc.
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Orders</h2>
      {loading ? (
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
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Buyer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.products.map((product) => product.name).join(", ")}
                </td>
                <td>
                  {order.products.map((product) => (
                    <img
                      key={product._id}
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ))}
                </td>
                <td>
                  {order.products.reduce(
                    (total, product) => total + product.price,
                    0
                  )}
                </td>
                <td>{order.products.length}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{order.buyer.name}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Not Process">Not Process</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancel">cancel</option>
          
                    {order.status && (
                      <option value={order.status} disabled hidden>
                        {order.status}
                      </option>
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
