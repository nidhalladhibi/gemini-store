import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  title: String,
  image: String,
  price: Number,
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String
    },
    paymentMethod: { type: String, enum: ["cash", "stripe"], default: "cash" },
    paymentResult: Object,
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
