import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams from React Router
import Layout from "../Layout/Layouts";
import axios from "axios";
import { useCart } from "../context/cart";
import "../CSS/categories.css"
import toast from "react-hot-toast";

function CategoriesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams(); // Get the category slug from URL parameters
  const navigate = useNavigate();
    const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/product-category/${slug}`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

  


    fetchProducts();
  }, [slug]); // Include slug in the dependency array to refetch products when slug changes



    const addToCart = (product, pid) => {
      console.log("pid" + pid);
      // Check if the product already exists in the cart
      const isProductInCart = cart.find((item) => item._id === pid);

      if (isProductInCart) {
        // Item already exists, show a message or update its quantity
        toast.error("Item already exists in the cart!");
        // You can update the quantity of the existing item here
      } else {
        toast.success("Item added to cart!");
        setCart(product);
      }
    };
  return (
    <Layout title={slug}>
      <div className="container mt-4">
        <h2 className="text-center">Products in {slug}</h2>

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
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                  <div className="col" key={product._id}>
                    <div className="card">
                      <div
                        className="image"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        <img
                          className="card-img-top"
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                        />
                      </div>

                      <div className="card-body">
                        <p className="card-title">{product.name}</p>
                        <p className="card-text">
                          {product.description.substring(0, 27)}....
                        </p>
                        <div className="cardBtn">
                          <p className="card-text">Rs {product.price}</p>
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
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CategoriesPage;
