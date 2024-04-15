import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`/${path}`, {
        state: pathname,
      });
    }, count * 1000);

    // Update count every second
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Cleanup timers
    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [count, navigate, pathname, path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">Redirecting to you in {count} seconds</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
