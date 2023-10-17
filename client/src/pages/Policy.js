import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const steps = [
    {
      title: "About this notice",
      content: (
        <p>
          This Privacy Notice provides information on how Cake app collects and
          processes your personal data when you visit our website or mobile
          applications. It sets out what we do with your personal data and how
          we keep it secure and explains the rights that you have in relation to
          your personal data.
        </p>
      ),
    },
    {
      title: "Who we are",
      content: (
        <p>
          Cake app is an African e-commerce platform. Our platform consists of
          our marketplace, which connects sellers with consumers, our logistics
          service, which enables the shipment and delivery of packages from
          sellers to consumers. Information on our subsidiaries can be found on
          this website.
        </p>
      ),
    },
    {
      title: "How we use your personal data",
      content: (
        <ul>
          <li>A. Registering you as a new customer.</li>
          <li>B. Processing and delivering your orders.</li>
          <li>C. Managing your relationship with us.</li>
          <li>D. Enabling you to participate in promotions, competitions, and surveys.</li>
          <li>E. Improving our website, applications, products, and services.</li>
          <li>F. Recommending/advertising products or services which may be of interest to you.</li>
          <li>G. Enabling you to access certain products and services offered by our partners and vendors.</li>
          <li>H. Complying with our legal obligations, including verifying your identity where necessary.</li>
          <li>I. Detecting fraud.</li>
        </ul>
      ),
    },
    // Add more steps as needed
  ];

  const titleStyle = {
    color: "green", // Green color for titles
  };

  const buttonStyle = {
    background: "green",
    color: "white", 
    border: "none", 
    padding: "10px 20px", 
    cursor: "pointer", 
    marginRight: "10px", 
  };

  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="/images/contactus.jpeg" alt="contact us" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h4 style={titleStyle}>{steps[step - 1].title}</h4>
          {steps[step - 1].content}
          {step > 1 && <button  style={buttonStyle} onClick={handlePrev}>Previous</button>}
          {step < steps.length && <button style={buttonStyle} onClick={handleNext}>Next</button>}
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
