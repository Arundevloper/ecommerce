import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ProductModule = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [shippingOption, setShippingOption] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

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

  const handleAddProduct = async () => {
    
     
    
    try {
      const formData = new FormData();

      formData.append("name", productName);
      formData.append("photo", productImage);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("quantity", productQuantity);
      formData.append("shipping", shippingOption);
      formData.append("category", categoryId);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if(res.data.success){
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    
      // Reset form after successful submission
      setProductName("");
      setProductImage(null);
      setProductDescription("");
      setProductPrice("");
      setProductQuantity("");
      setShippingOption("");
      setCategoryId("");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
      
   
 

  return (
    <div className="product-module">
      <h2>Add Product</h2>
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
        {productImage && (
          <div className="text-center">
            <img
              src={URL.createObjectURL(productImage)}
              alt="product_photo"
              height={"200px"}
              className="img img-responsive"
            />
          </div>
        )}
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
      <button className="btn btn-primary" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default ProductModule;
