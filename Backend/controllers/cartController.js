import Cart from "../models/cartModel.js";

// Get All Carts

const getAllCarts = async (req, res, next) => {
  try {
    let response = await Cart.find();
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
};

// Get one cart

const getCart = async (req, res, next) => {
  try {
    let { id } = req.params;
    let response = await Cart.findOne({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
};

// add a Cart

const addCart = async (req, res, next) => {
  let body = req.body;
  try {
    let newCart = new Cart(body);
    let response = await newCart.save();
    res.status(201).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
};

// Update a Cart

const putCart = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  try {
    console.log("data", data);
    let response = await Cart.updateOne({ _id: id }, { $set: data });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

// Delete a Cart

const deleteCart = async (req, res, next) => {
  let id = req.params.id;
  try {
    let response = await Cart.findByIdAndRemove({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

export default {
  getAllCarts,
  getCart,
  addCart,
  putCart,
  deleteCart,
};
