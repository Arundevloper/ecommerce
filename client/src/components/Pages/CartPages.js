import React, { useState } from "react";
import Layouts from "../Layout/Layouts";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../CSS/cart.css";

function CartPages() {
  const [cart, setCart] = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
   
    if(updatedCart){
      toast.success("Product Removed");
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    else{
        toast.error("Some Error Occurrd");
    }
  };

const totalAmount = cart && Array.isArray(cart.items)
  ? cart.items.reduce((total, product) => total + product.price, 0)
  : 0;


  const saveOrder = async (cart, userId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/saveTheOrders`,
        { cart, userId }
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error saving order:", error);
      throw error; // Throw the error for the caller to handle
    }
  };


  // Usage example:
  const proceedToCheckout = async () => {
    if (auth.length=== "") {
      return toast.error("Please login first to order.");
   
    }

    if (cart.length === 0) {
      toast.error("No items are there");
      return;
    }

    const authData = JSON.parse(localStorage.getItem("auth"));
    const userId = authData && authData.user && authData.user._id;
    console.log("uerID"+userId);
    setLoading(true);
    try {
      await saveOrder(cart,userId);
      setLoading(false);
      toast.success("Order made successfully");
      setCart([]);
      navigate("/dashboard/user");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to place order. Please try again later.");
    }
  };
  return (
    <Layouts title={"cart"}>
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            {!auth?.user ? (
              <p className="text-center">Hello Guest</p>
            ) : (
              <p className="text-center userName">
                Hello {auth?.token && auth?.user?.name}
              </p>
            )}
            <p className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    !auth?.token ? "please login to checkout !" : ""
                  }`
                : ""}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="yourCart">
              <h2 className="mb-4">Your Cart</h2>
            </div>
            {cart.length === 0 ? (
              <div className="alert alert-info" role="alert">
                Your cart is empty
              </div>
            ) : (
              <div>
                {cart.map((product) => (
                  <div
                    key={product._id}
                    className="row mb-3 align-items-center"
                  >
                    <div className="col-md-3">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="img-fluid"
                        style={{ width: "104px", height: "130px" }}
                      />
                    </div>
                    <div className="col-md-6 pName">
                      <div>
                        <h5 className="product-name">{product.name}</h5>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <p className="product-price">Price: ₹{product.price}</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn  btn-outline-success"
                          onClick={() => removeCartItem(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="sticky-top">
              <div className="yourCart">
                <h5 className="mb-4 total">Total Amount:</h5>
                <h5 className="total">₹{totalAmount}</h5>
                <button
                  className="btn btn-outline-success mt-5"
                  onClick={proceedToCheckout}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default CartPages;
