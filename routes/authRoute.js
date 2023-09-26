import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  getAllUsers,
  deleteUser,
  cancelOrder
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//route for fetching users
router.get("/users", getAllUsers);

// Delete a user by ID
router.delete("/user/:id", deleteUser);

//orders for payment
// router.get("/orders", requireSignIn, getOrdersController);

//all orders
// router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
// router.put(
//   "/order-status/:orderId",
//   requireSignIn,
//   isAdmin,
//   orderStatusController
// );

// Place Order Route for cash on delivery
router.post('/place-order', requireSignIn, placeOrder);

// Route to get all orders
router.get("/all-orders", getAllOrders);

// Route to update order status
router.put("/order-status/:orderId", updateOrderStatus);

// Define the route for fetching user orders
router.get("/userorders", requireSignIn, getUserOrders);

// Define a route to cancel an order by its ID by the user
router.delete("/cancel-order/:orderId", cancelOrder);


export default router;