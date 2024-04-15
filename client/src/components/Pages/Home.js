import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layouts";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import "../CSS/home.css";

const HomePages = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [cart, setCart] = useCart();
  
  const navigate = useNavigate();

  // Manually defined price ranges
  const priceRanges = [
    "0-499",
    "500-999",
    "1000-4999",
    "4999-9999",
    "9999-49999",
    "4999-99999",

  ];





const addToCart = (product,pid) => {
  console.log("pid"+pid);
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

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (res) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProducts = async () => {
    console.log("i executed");
    try {
      const { res } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked: selectedCategories,
          radio: selectedPriceRange,
        }
      );
      if (res) {
        setProducts(res?.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (res) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategories.length || !selectedPriceRange) {
      setLoading(true);
      getFilteredProducts();
    }
  }, [selectedCategories, selectedPriceRange]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange("");
  };

  const filterProducts = (product) => {
    let categoryMatch = true;
    let priceRangeMatch = true;

    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.includes(product.category._id);
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split("-");
      const price = parseFloat(product.price);
      priceRangeMatch =
        price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
    }

    return categoryMatch && priceRangeMatch;
  };

  return (
    <>
      <Layout title={"Home"}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3 filter">
              <h2>Filter by Category</h2>
              {categories.map((category) => (
                <div key={category._id}>
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  <label className="ms-2" htmlFor={category._id}>
                    {category.name}
                  </label>
                </div>
              ))}
              <h2 className="mt-4">Filter by Price</h2>
              {priceRanges.map((range) => (
                <div key={range}>
                  <input
                    type="radio"
                    id={`price-${range}`}
                    name="price"
                    value={range}
                    checked={selectedPriceRange === range}
                    onChange={() => handlePriceRangeChange(range)}
                  />
                  <label className="ms-2" htmlFor={`price-${range}`}>
                    {range}
                  </label>
                </div>
              ))}
              <button
                className="btn btn-danger mt-3"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
            {loading ? (
              <div className="col-md-9">
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
            ) : (
              <div className="col-md-9">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {products.filter(filterProducts).map((product) => (
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
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePages;
