// import mongoose from "mongoose";

// const orderSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     address: { type: String, required: true },
//     contact: { type: String,  }, // Assuming contact is a string
//     cartItems: [
//       {
//         // Define the structure of each order item
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Products", // Assuming you have a Product model
//           required: true,
//         },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     subtotal: { type: Number, },
//     isDelivered: { type: Boolean, default: false },
//     // userId: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "users", // Assuming you have a User model
//     //   required: true,
//     // },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Ordes", orderSchema);
// models/Order.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', // Assuming you have a Product model
        required: true,
      },
      // quantity
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
     

    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming you have a User model
    required: true,
  },
  status: {
    type: String,
    default: "Not Process",
    enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ordes", orderSchema);

