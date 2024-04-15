import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MessageBox = ({ message, color, onClose }) => {
  return (
    <div
      className={`alert alert-${color} my-2 alert-dismissible fade show`}
      role="alert"
    >
      <span>{message}</span>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default MessageBox;
