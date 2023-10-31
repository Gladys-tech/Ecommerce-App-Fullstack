import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';
const Footer = () => {
  return (
    <div className="footer wrap">
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
      <h1 className="text-center">All Right Reserved &copy; Gladys Tech</h1>
    </div>
  );
};

export default Footer;