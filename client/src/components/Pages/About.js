import React from "react";
import Layout from "../Layout/Layouts";


const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="../images/about.jpg"
            alt="contactus"
            className="about-image"
          />
        </div>
        <div className="col-md-6 mt-4">
          <p className="about-text">
            Welcome to <span className="highlight">Ecom</span>! We're dedicated
            to providing top-quality products and exceptional service. With a
            focus on convenience and customer satisfaction, we offer a curated
            selection of items, easy online shopping, and secure transactions.
            Thank you for choosing us—we're here to make your shopping
            experience seamless and enjoyable. Happy shopping from the{" "}
            <span className="highlight">Ecom</span>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
