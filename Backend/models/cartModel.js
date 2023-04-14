import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },

    // product: [
    //   {
    //     productId: {
    //       type: String,
    //     },
    //     quantity: {
    //       type: Number,
    //       default: 1,
    //     },
    //   },
    // ],

    userName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    collection: "Carts",
  }
);

const Cart = model("Cart", CartSchema);
export default Cart;
