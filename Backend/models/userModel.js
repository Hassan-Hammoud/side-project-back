import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "User",
    },

    cart: {
      type: Array,
      default: [],
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },

  {
    timestamps: true,
    collection: "Users",
  }
);


UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isPasswordMatched  = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};


const User = model("User", UserSchema);
export default User;