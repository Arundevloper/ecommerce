import React from "react";
import Layout from "../Layout/Layouts";
import { useSearch } from "../context/search";
import "../CSS/home.css"
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";


const Search = () => {
  const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

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
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center result">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {values?.results.map((product) => (
                <div className="col" key={product._id}>
                  <div className="card">
                    <div className="image">
                      <img
                        onClick={() => navigate(`/product/${product.slug}`)}
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
                            addToCart([...cart, product], product._id);
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
      </div>
    </Layout>
  );
};

export default Search;
//  <h1>Search Resuts</h1>
//           <h6>
//             {values?.results.length < 1
//               ? "No Products Found"
//               : `Found ${values?.results.length}`}
//           </h6>
//  <div className="col-md-9">
//    <div className="row row-cols-1 row-cols-md-3 g-4">
//       {values?.results.map((product) => (
//        <div className="col" key={product._id}>
//          <div className="card">
//            <div className="image">
//              <img
//                className="card-img-top"
//                 src={ `${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                
//                alt={product.name}
//              />
//            </div>

//            <div className="card-body">
//              <p className="card-title">{product.name}</p>
//              <p className="card-text">Rs {product.price}</p>
//              <p className="card-text">{product.description}</p>
//              <div className="cardBtn">
//                <button
//                  className="btn btn-outline-success"
//                  onClick={() => addToCart(product._id)}
//                >
//                  Add to Cart
//                </button>
//              </div>
//            </div>
//          </div>
//        </div>
//      ))}
//    </div>
//  </div>;