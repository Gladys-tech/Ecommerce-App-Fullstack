import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  const iconStyle = {
    color: 'green', // Set the color to green
  };
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className=" p-2 text-white text-center" style={{backgroundColor:"green"}}>CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about products feel free to call anytime we are 24X7
            availiable
          </p>
          <p className="mt-3">
            <BiMailSend  style={iconStyle}/> : gladyskyambadde0@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall  style={iconStyle}/> : +256-757 763 516
          </p>
          <p className="mt-3">
            <BiSupport  style={iconStyle}/> : +256-763 883 828 (optional)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;