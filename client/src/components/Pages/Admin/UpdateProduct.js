import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AllProduct from "./AllProduct";
import "../../CSS/updateProduct.css";

const UpdateProduct = ({ productId }) => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [shippingOption, setShippingOption] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [prdoductId, setProductId] = useState(false);

  useEffect(() => {
    const getAllTheCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-category`
        );
        setCategories(res.data.category);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTheCategories();
  }, []);

  useEffect(() => {
    // Fetch product details only if productId is provided
    if (productId) {
      const fetchProductDetails = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/product/get-product/${productId}`
          );
          const { product } = res.data;
          setProductId(product._id);
          setProductName(product.name);
          setProductImage(product.photo);
          setProductDescription(product.description);
          setProductPrice(product.price);
          setProductQuantity(product.quantity);
          setShippingOption(product.shipping);
          setCategoryId(product.category._id);
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
      fetchProductDetails();
    }
  }, [productId]);

  const handleAddOrUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("photo", productImage);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("quantity", productQuantity);
      formData.append("shipping", shippingOption);
      formData.append("category", categoryId);

      if (productId) {
        // Update product if productId is available
        const res = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/product/update-product/${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res) {
          setIsEditing(true);
          toast.success("Product updated successfully");
        }
      } else {
        // Add new product if productId is not available
        // Make a POST request to add new product
        // Handle success and update UI accordingly
      }

      // Reset form after successful submission
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductQuantity("");
      setShippingOption("");
      setCategoryId("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    
  };
const handelCancel = () => {
  setIsEditing(true); // Set isEditing to true to render the UpdateProduct component
};
  return (
    <>
      {isEditing ? (
        <AllProduct onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="product-module">
          <div className="labels">
            <h2> "Update Product" </h2>
            <button
              type="submit"
              onClick={handelCancel}
              className="btn btn-outline-success"
            >
              Cancel
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productImage">Product Image</label>
            <input
              type="file"
              className="form-control-file"
              id="productImage"
              accept="image/*"
              name="photo"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <div className="text-center">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prdoductId}`}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">Product Description</label>
            <textarea
              className="form-control"
              id="productDescription"
              rows="3"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Product Price</label>
            <input
              type="text"
              className="form-control"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productQuantity">Product Quantity</label>
            <input
              type="text"
              className="form-control"
              id="productQuantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingOption">Shipping Option</label>
            <select
              className="form-control"
              id="shippingOption"
              value={shippingOption ? "Yes" : "No"} // Set the selected value based on shippingOption
              onChange={(e) => setShippingOption(e.target.value === "Yes")} // Convert 'Yes' to true and 'No' to false
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              className="form-control"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddOrUpdateProduct}
          >
            Update Product
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
