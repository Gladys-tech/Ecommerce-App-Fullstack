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
// import geocodeAddress from "../utils/geocode";
// import calculateDistance from "../utils/distance";
// import calculatePrice from "../utils/pricing";


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

  // const [userAddress, setUserAddress] = useState(""); // User's address
  // const [storeAddress, setStoreAddress] = useState(""); // Your store's address
  // const [weight, setWeight] = useState(0); // Weight of items
  // const [transportCost, setTransportCost] = useState(0); // Transport cost

  // Function to calculate transport cost based on distance
// const calculateTransportCost = async (userAddress, storeAddress, cart, weight) => {
//   try {
//     // Use geocoding API to convert user address and store address to coordinates
//     const userCoordinates = await geocodeAddress(userAddress);
//     const storeCoordinates = await geocodeAddress(storeAddress);

//     // Calculate distance between user and store
//     const distance = calculateDistance(userCoordinates, storeCoordinates);

//     // Apply pricing rules based on distance and weight
//     const transportCost = calculatePrice(distance, weight);

//     return transportCost;
//   } catch (error) {
//     console.error(error);
//     return 0; // Handle errors gracefully
//   }
// };



  // In your useEffect
  // useEffect(() => {
  //   if (cart.length > 0) {
  //     // Fetch and calculate transport cost when cart items change
  //     calculateTransportCost(userAddress, storeAddress, cart, weight)
  //       .then((cost) => {
  //         // Update transport cost in your component state
  //         setTransportCost(cost);
  //       })
  //       .catch((error) => {
  //         // Handle errors
  //         console.error(error);
  //       });
  //   }
  // }, [userAddress, storeAddress, cart, weight]);

  
  // Initialize your cart data with a default quantity of 1 for each item
  useEffect(() => {
    // Initialize quantity to 1 for items in the cart
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  // Increase quantity for an item in the cart
  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQuantity = (item.quantity || 1) + 1;
        const stockQuantity = item.stockQuantity;
  
        // Limit quantity to the stock quantity
        return { ...item, quantity: Math.min(newQuantity, stockQuantity) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQuantity = (item.quantity || 1) - 1;
  
        // Minimum quantity is 1
        return { ...item, quantity: Math.max(newQuantity, 1) };
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
                    {p.stockQuantity > 0 ? (
              <p>Quantity Left: {p.stockQuantity - p.quantity}</p>
            ) : (
              <p>Out of Stock</p>
            )}

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
                        disabled={p.stockQuantity === 0 || p.quantity === p.stockQuantity}
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
                     {/* Display transport cost */}
        {/* <div className="transport-cost">
          {transportCost > 0 ? (
            <p>Estimated Transport Cost: {transportCost} YourCurrency</p>
          ) : (
            <p>Transport cost calculation error. Please check your address.</p>
          )}
        </div> */}
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