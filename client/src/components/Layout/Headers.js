import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import SearchInput from "../form/SearchInput";
import { useCart } from "../context/cart";
import { Badge } from "antd";
import axios from "axios";

const Headers = () => {
  const { auth, setAuth } = useAuth();
  const [category, setCategories] = useState([]);
  const [cart] = useCart();

  //Get All Categories
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

  useEffect(() => {
    getAllTheCategories();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            Ecommerce
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <SearchInput />
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {category.map((category) => (
                    <li key={category._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${category.slug}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Conditional rendering for User dropdown */}
              {auth.user ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.name} {/* Display the fetched name */}
                  </Link>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth.user
                            ? auth.user.role === 1
                              ? "admin"
                              : "user"
                            : ""
                        }`}
                        className="dropdown-item"
                        activeclassname="active"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                // Render signin and login links if user is not authenticated
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Signin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link"
                  activeclassname="active"
                >
                  CART
                  <Badge count={cart?.length}></Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Headers;
