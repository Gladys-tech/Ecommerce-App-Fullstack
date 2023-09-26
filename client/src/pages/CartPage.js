import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [contact, setContact] = useState("");

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  // Increase quantity for an item in the cart
  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQuantity = item.quantity + 1;
        return { ...item, quantity: Math.min(newQuantity, 50) }; // Limit quantity to 5
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity for an item in the cart
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // Minimum quantity is 1
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate the total price including item quantities
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "UGX",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate the total price and quantity including item quantities
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Function to place an order
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };


  // Function to place an order
  const orderPlaced = () => {
    if (!auth || !auth.user) {
      alert('Please log in to place an order');
      return;
    }

    // Check if the contact field is empty
  if (!contact) {
    alert('Please enter your contact information');
    return;
  }

    setLoading(true);

    const orderData = {
      name: auth.user.name,
      email: auth.user.email,
      address: auth.user.address,
      contact: contact,
      cartItems: cart.map((item) => ({
        product: item._id, // Assuming item._id is the ObjectId of the product
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      })),
      subtotal: calculateSubtotal(),
      userId: auth.user._id,
    };

    axios
      .post('/api/v1/auth/place-order', orderData)
      .then((response) => {
        if (response.data.success) {
          // Clear the cart in state
          setCart([]);
          // Clear the cart in local storage
          localStorage.removeItem('cart');
          setSuccess(true);
          setLoading(false);
          toast.success('Order placed Successfully');
          setTimeout(() => {
            navigate('/dashboard/user/orders');
          }, 2000);
        } else {
          setError('Failed to place the order. Please try again.');
          setLoading(false);
          // Display the server error message if available
          if (response.data.message) {
            setError(response.data.message);
          }
        }
      })
      .catch((error) => {
        setError('Failed to place the order. Please try again.');
        setLoading(false);
        console.log(error);
      });
  };


  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    {/* Quantity controls */}
                    <div className=" quantity-control" >
                      <button
                        className="quantity-button"
                        onClick={() => decreaseQuantity(p._id)}
                      >
                        -
                      </button>
                      <span className="quantity">{p.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => increaseQuantity(p._id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}

                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Personal info | Place Order</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {/* <h4>Total : {totalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })} </h4> */}
              <p>Total Quantity: {totalQuantity}</p>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <p>Cash on delivery!</p>
                    <p>You will pay extra 5000/= for transport</p>
                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label">
                        Contact Information:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="type your contact *"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>

                    <button onClick={orderPlaced}
                     className="btn btn-primary"
                     >
                       Place Order
                    </button>
                    {/* <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;