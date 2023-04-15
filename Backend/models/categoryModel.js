import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {

    name: {
      type: String,
      required: true,
    },
  },
  {
    products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],

    timestamps: true,
    collection: "Categories",
    
  }
);

const Category = model("Category", CategorySchema);
export default Category;
