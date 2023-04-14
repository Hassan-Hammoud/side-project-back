import slugify from 'slugify';
import Product from '../models/productModel.js';
// import fs from "fs";
import asyncHandler from "express-async-handler";

// Get All Products

const getAllProducts = async (req, res, next) => {

  // console.log(req.query);
  try {
     let response = await Product.find();
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, error });
  }
 
  };

  
  // get an Product by id
  
  const getProduct = async (req, res, next) => {
      try {
        let { id } = req.params;
      let response = await Product.findOne({ _id:id});
      res.status(200).send({ success: true, response });
      } catch (error) {
        console.log(error);
        res.status(400).send({ error: true, error });
      }

}

// Add Product

  const addProduct = asyncHandler(async (req, res, next) =>  {
    let body = req.body;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      let newProduct = new Product (body);
      let response = await newProduct.save();
      res.status(201).send({ success: true, response });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: true, error });
    }
  });

  // update Prduct

  const putProduct = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    console.log("data", data);
    let response = await Product.updateOne({ _id: id }, { $set: data });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

  // Delete an Product

const deleteProduct = async (req, res, next) => {
  let id = req.params.id;
  try {
    let response = await Product.findByIdAndRemove({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};
  
  export default {
    getAllProducts,
    getProduct,
    addProduct,
    putProduct,
    deleteProduct,
  };