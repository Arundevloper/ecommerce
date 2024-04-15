import React from "react";
import Layout from "../Layout/Layouts";


const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/privarcy.jpg"
            alt="contactus"
            className="contact-image"
          />
        </div>
        <div className="col-md-6">
          <div className="policy-content">
            <h2 className="policy-heading">Privacy Policy</h2>
            <p className="policy-text">
              At [Your E-commerce Website], we value the privacy of our visitors
              and customers. This Privacy Policy outlines the types of personal
              information that is received and collected by [Your E-commerce
              Website] and how it is used.
            </p>
            <p className="policy-text">
              [Your E-commerce Website] may collect personal information such as
              name, email address, shipping address, and payment details when
              users place an order or register for an account on our website. We
              use this information solely for the purpose of processing orders,
              providing customer support, and improving our services.
            </p>
            <p className="policy-text">
              We may also collect non-personal information such as browser type,
              device information, and website usage data through cookies and
              similar technologies to enhance user experience and analyze
              website traffic. Users can choose to disable cookies in their
              browser settings, although this may affect the functionality of
              the website.
            </p>
            <p className="policy-text">
              [Your E-commerce Website] is committed to protecting the security
              of personal information and employs industry-standard security
              measures to safeguard data against unauthorized access,
              disclosure, alteration, or destruction.
            </p>
            <p className="policy-text">
              This Privacy Policy applies only to information collected through
              our website and does not extend to any third-party websites that
              may be linked to from our site. Users are encouraged to review the
              privacy policies of these third-party websites for more
              information on their data practices.
            </p>
            <p className="policy-text">
              By using [Your E-commerce Website], users consent to the terms of
              this Privacy Policy. We reserve the right to update or modify this
              Privacy Policy at any time, and users are responsible for checking
              this page periodically for changes.
            </p>
            <p className="policy-text">
              If you have any questions or concerns about our Privacy Policy,
              please contact us at [contact email/phone number].
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
