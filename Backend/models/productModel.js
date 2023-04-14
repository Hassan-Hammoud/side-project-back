import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a product name"],
        trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "Please enter a description"],
    },

    price: {
      type: String,
      required: [true, "Please enter a product price"]
    },

    category: {
      type: String,
      required: [true, "Please enter a category"],
    },

    brand: {
      type: String,
      required: [true, "Please enter a brand"],
    },

    quantity : {
      type: Number,
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
    },

    images: {
      type: Array,
    },

    color: {
      type: String,
      required: true,
    },

    rating: [
      {
        star: Number,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
      },
    ],

  },
  {
    collection: "Products",
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);
export default Product;
