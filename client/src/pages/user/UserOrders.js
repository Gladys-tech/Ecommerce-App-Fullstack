import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/userorders"); 
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const cancelOrder = async (orderId) => {
    try {
      // Send a DELETE request to cancel the order
      await axios.delete(`/api/v1/auth/cancel-order/${orderId}`);

      // Remove the cancelled order from the state
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));

      // Show a success toast notification
      toast.success("Order canceled successfully!");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              const canCancelOrder = ["Not Process", "Processing"].includes(o.status);

              return (
                <div className="border shadow" key={`order_${o._id}`}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Contact</th>
                        <th scope="col">No of Orders</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.name}</td> {/* Assuming user's name is directly in the order */}
                        <td>{moment(o?.created_at).fromNow()}</td>
                        <td>{o?.contact}</td>
                        <td>{o?.cartItems.length}</td>
                        <td>
                          {canCancelOrder && (
                            <button
                              className="btn btn-danger"
                              onClick={() => cancelOrder(o._id)}
                            >
                              Cancel
                            </button>
                          )}

                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.cartItems?.map((p, j) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p.product._id}`}
                            className="card-img-top"
                            alt={p.product.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.product.name}</p>
                          <p>{p.product.description}</p>
                          <p>Price: {p.product.price}</p>
                          <p>Quantity Ordered: {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
