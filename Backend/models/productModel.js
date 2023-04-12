import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      //  trim: true,
    },

    description: {
      type: String,
      required: [true, "Please enter a description"],
    },

    price: {
      type: String,
      required: [true, "Please enter a product price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },

    images: {
      public_id: {
        type: String,
        required: true,
      },
    },

    categories: {
      type: Array,
    },

    size: {
      type: String,
    },

    color: {
      type: String,
    },
  },
  {
    collection: "Products",
  }
);

const Product = model("Product", ProductSchema);
export default Product;
