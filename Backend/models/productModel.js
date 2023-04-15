import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a product name"],
        trim: true,
    },


    
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },

    price: {
      type: String,
      required: [true, "Please enter a product price"]
    },

    image: {
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
