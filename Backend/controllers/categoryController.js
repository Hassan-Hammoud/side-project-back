import Category from "../models/categoryModel.js";

// Get All Categories

const getAllCategories = async (req, res, next) => {
  try {
    let response = await Category.find();
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
};

// Get one Category

const getCategory = async (req, res, next) => {
  try {
    let { id } = req.params;
    let response = await Category.findOne({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
};

// add a Category

const addCategory = async (req, res, next) => {
  let body = req.body;
  try {
    let newCategory = new Category(body);
    let response = await newCategory.save();
    res.status(201).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
};

// Update a Category

const putCategory = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  try {
    console.log("data", data);
    let response = await Category.updateOne({ _id: id }, { $set: data });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

// Delete a Category

const deleteCategory = async (req, res, next) => {
  let id = req.params.id;
  try {
    let response = await Category.findByIdAndRemove({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

export default {
  getAllCategories,
  getCategory,
  addCategory,
  putCategory,
  deleteCategory,
};
