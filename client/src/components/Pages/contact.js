import React from "react";
import Layout from "../Layout/Layouts";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus mt-2">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            className="contact-image"
          />
        </div>
        <div className="col-md-4 contact-info ">
          <h1 className="contact-heading">CONTACT US</h1>
          <p className="contact-text">
            Any query and info about products, feel free to call anytime. We are
            available 24/7.
          </p>
          <p className="contact-details">
            <BiMailSend /> :{" "}
            <a href="mailto:help@ecommerceapp.com">help@ecommerceapp.com</a>
          </p>
          <p className="contact-details">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="contact-details">
            <BiSupport /> : 1800-0000-0000 (toll-free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
