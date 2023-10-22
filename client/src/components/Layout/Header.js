import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import './Header.css';

const linkStyle = {
  color: "green", // Default color
  
};



const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div className="" style={{ marginBottom: 80 }}
    >
      <nav className="navbar navbar-expand-lg  fixed-top navbar-no-box-shadow" 
      style={{ backgroundColor: "white", }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={linkStyle}>
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link " 
                onMouseEnter={(e) => {
                  e.target.style.color = "green";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  onMouseEnter={(e) => {
                    e.target.style.color = "green";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                  }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" 
                onMouseEnter={(e) => {
                  e.target.style.color = "green";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/categories"}
                    onMouseEnter={(e) => {
                      e.target.style.color = "white";
                      e.target.style.backgroundColor = "green";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                      e.target.style.backgroundColor = "white";

                    }}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        onMouseEnter={(e) => {
                          e.target.style.color = "white";
                          e.target.style.backgroundColor = "green";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "green";
                          e.target.style.backgroundColor = "white";

                        }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" 
                    onMouseEnter={(e) => {
                      e.target.style.color = "green";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                    }}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link"
                    onMouseEnter={(e) => {
                      e.target.style.color = "green";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                    }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none", color:"#410179" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          onMouseEnter={(e) => {
                            e.target.style.color = "green";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = "black";
                          }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          onMouseEnter={(e) => {
                            e.target.style.color = "green";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = "black";
                          }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link" style={linkStyle}>
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;