import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminsOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      // Send a request to update the status in the database
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
  
      // Update the status of the order in the orders state
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === orderId ? { ...o, status: value } : o
        )
      );
      // Show a success toast notification
    toast.success("Status updated successfully!", {
        duration: 1000, 
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.map((o, i) => (
            <div className="border shadow" key={o._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Contact</th>
                    <th scope="col">No of Orders</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.name}</td>
                    <td>{moment(o?.created_at).fromNow()}</td>
                    <td>{o?.contact}</td>
                    <td>{o?.cartItems.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.cartItems.map((item) => (
                  <div className="row mb-2 p-3 card flex-row" key={item._id}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${item.product._id}`}
                        className="card-img-top"
                        alt={item.product.name}
                        width="100px"
                        height={"100px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{item.product.name}</p>
                      <p>Price: {item.product.price}</p>
                      <p>Quantity Ordered: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminsOrders;
