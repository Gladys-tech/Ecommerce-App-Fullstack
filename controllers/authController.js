import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import ordersModel from "../models/ordersModel.js"; 
import productModel from "../models/productModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";



export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // console.log("JWT Secret:", process.env.JWT_SECRET);

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to delete a user by ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Delete the user's orders
    await ordersModel.deleteMany({ userId: userId });

    // Delete the user
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User and associated orders deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


// Function to place an order by cash on delivery
// Update stock quantity and mark product as out of stock if needed
const updateStockAndMarkOutOfStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (product) {
      const newStockQuantity = product.stockQuantity - quantity;
      console.log(newStockQuantity);
      if (newStockQuantity <= 0) {
        product.outOfStock = true;
      }
      product.stockQuantity = newStockQuantity;
      await product.save();
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to place an order by cash on delivery
export const placeOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Iterate through cart items and update stock quantities
    for (const cartItem of orderData.cartItems) {
      await updateStockAndMarkOutOfStock(cartItem.product, cartItem.quantity);
    }

    const order = new ordersModel(orderData);
    await order.save();

    return res.status(201).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to place the order. Please try again.' });
  }
};

// export const placeOrder = async (req, res) => {
//   try {
//     const orderData = req.body;

//     const order = new ordersModel(orderData);
//     await order.save();

//     return res.status(201).json({ success: true, message: 'Order placed successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Failed to place the order. Please try again.' });
//   }
// };

// Fetch all orders for cash on delivery

export const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel
      .find()
      .populate({
        path: 'cartItems.product',
        select: 'name price', // Include the fields you need (name and price)
      })
      .select('name email address contact cartItems status created_at');

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update order status
export const updateOrderStatus = async (req, res) => {
  
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await ordersModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user._id; // Assuming you're using authentication middleware
  try {
    const orders = await ordersModel
      .find({ userId }) // Filter by user ID
      .populate({
        path: 'cartItems.product',
        select: 'name description price', // Include the fields you need (name and price)
      })
      // .select('name email address contact cartItems status created_at');

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching user orders",
      error: error.message,
    });
  }
};


// Controller to cancel an order by its ID
export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    // Find the order by ID and delete it
    const deletedOrder = await ordersModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





