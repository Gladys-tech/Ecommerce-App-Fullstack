import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/users"); 
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user by ID
  const deleteUser = async (userId) => {
    try {
      // Send a request to delete the user
      await axios.delete(`/api/v1/auth/user/${userId}`);

      // Remove the deleted user from the state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      // Show a success toast notification
      toast.success("User deleted successfully!", {
        duration: 1000,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                    <th scope="col">Answer</th>
                    <th scope="col">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.role}</td>
                      <td>{user.answer}</td>
                      <td>
                        {user.role !== 1 && ( // Exclude admin with role 1
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;