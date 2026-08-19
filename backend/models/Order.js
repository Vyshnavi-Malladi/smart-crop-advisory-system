// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     city: String,
//     state: String,
//     pincode: String
//   },

//   items: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "AgriProduct" },
//       name: String,
//       price: Number,
//       quantity: { type: Number, default: 1 }
//     }
//   ],

//   totalAmount: Number,

//   razorpay_order_id: String,
//   razorpay_payment_id: String,

//   status: {
//     type: String,
//     default: "Paid"
//   }

// }, { timestamps: true });

// module.exports = mongoose.model("Order", OrderSchema);




const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  // 🔐 Link Order to Logged-in User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AgriProduct",
        required: true
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  razorpay_order_id: {
    type: String,
    required: true
  },

  razorpay_payment_id: {
    type: String,
    required: true
  },

  status: {
  type: String,
  enum: ["Paid", "Processing", "Shipped", "Delivered", "Cancelled"],
  default: "Paid"
}

}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);