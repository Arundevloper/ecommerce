import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layouts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/productDetails.css";
import { CartProvider, useCart } from "../context/cart";
import {Naviagate} from "react-router-dom";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate=useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/get-products/${slug}`
        );
        setProduct(data.product);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const addToCart = (product, pid) => {
    console.log("pid" + pid);
    const isProductInCart = cart.find((item) => item._id === pid);

    if (isProductInCart) {
      toast.error("Item already exists in the cart!");
    } else {
      toast.success("Item added to cart!");
      setCart(product);
    }
  };

  // Function to fetch related products
  const fetchRelatedProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${product._id}/${product.category._id}`
      );
      if (data.products.length > 0) {
        setSimilarProducts(data.products);
      } else {
        toast.error("No Similar Products Are Available");
      }
    } catch (error) {
      console.log("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    // Implement your logic for adding the product to the cart here
    console.log("Product added to cart:", product._id);
  };

  return (
    <Layout title="Product-Details">
      <div className="products">
        <h1 className="mb-4">Product Details</h1>
      </div>
      {product ? (
        <div className="row my-3">
          <div className="col-md-6 d-flex justify-content-center pimage">
            {/* Product Image */}
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid mb-4 mx-auto "
              style={{ maxWidth: "100%", maxHeight: "350px" }} // Limit image size
            />
          </div>
          <div className="col-md-6  pdetails">
            <h1>{product.name}</h1>

            <p className="desc-price">Price: &#8377;{product.price}</p>
            <p className="desc">Description: {product.description}</p>
            {/* Add to Cart Button */}
            <button
              className="btn btn-outline-success"
              onClick={() => {
                addToCart([...cart, product], product._id); // Close setCart properly with a semicolon
                // Call toast.success after setting the cart
              }}
            >
              Add to Cart
            </button>
            {/* Fetch Related Products Button */}
            <button
              className="btn btn-outline-success ms-2"
              onClick={fetchRelatedProducts}
            >
              {loading ? "Loading..." : "Similar Products"}
            </button>
          </div>
        </div>
      ) : (
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
      )}
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-5">
          <div className="similar">
            <h1>Similar Products</h1>
          </div>
          <div className="row">
            {similarProducts.map((product) => (
              <div className="col" key={product._id}>
                <div className="card">
                  <div
                    className="image"
                    onClick={() => {
                      setSimilarProducts([]);
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                    />
                  </div>

                  <div className="card-body">
                    <p className="card-title">{product.name}</p>
                    <p className="card-text">Rs {product.price}</p>
                    {product.description.substring(0, 30)}....
                    <div className="cardBtn">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => {
                          addToCart([...cart, product], product._id); // Close setCart properly with a semicolon
                          // Call toast.success after setting the cart
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ProductDetails;
