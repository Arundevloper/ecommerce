import React, { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import toast from "react-hot-toast";
import { Modal } from "antd";
import axios from "axios";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const [loading, setLoading] = useState(true);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (res) {
        console.log(res);
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching products");
    } finally {
      setLoading(false); // Set loading state to false after fetching products
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleDelete = (productName) => {
    setProductToDelete(productName);
    setIsModalOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${productToDelete}`
      );
      if (res) {
        toast.success("Product deleted successfully");
        getAllProduct();
        setIsModalOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(true); // Set isEditing to true to render the UpdateProduct component
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = (updatedProduct) => {
    setEditingProduct(updatedProduct);
    setIsEditing(false); // Set isEditing to false to render the table of all products
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      {isEditing ? ( // Render the UpdateProduct component if isEditing is true
        <UpdateProduct
          productId={editingProduct} // Pass the product ID as a prop
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)} // Cancel editing by setting isEditing to false
        />
      ) : (
        <div>
          <div className="container">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Products"
              value={searchTerm}
              onChange={handleSearch}
            />

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Shipping</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <tr key={product.name}>
                        <td>{product.name}</td>
                        <td>
                          {showFullDescription
                            ? product.fullDescription
                            : product.description.length > 50 // Use dynamic condition based on description length
                            ? product.description.substring(0, 10) + "..."
                            : product.description}
                          {product.description.length > 50 && (
                            <button
                              className="btn btn-link p-0"
                              onClick={toggleDescription}
                            >
                              {showFullDescription ? "Read less" : "Read more"}
                            </button>
                          )}
                        </td>
                        <td> ₹ {product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.shipping ? "Yes" : "No"}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            style={{ width: "80px", height: "100px" }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-success ms-2"
                            onClick={() => handleEdit(product._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn ms-2 btn-outline-danger"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal
        title="Delete Product"
        visible={isModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        Are you sure you want to delete this product?
      </Modal>
    </div>
  );
}

export default AllProduct;
