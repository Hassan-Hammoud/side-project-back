import slugify from 'slugify';
import Product from '../models/productModel.js';
import fs from "fs";
import asyncHandler from "express-async-handler";
// Get All Products

// const getAllProducts = asyncHandler(async (req, res) => {
//   try {

// // Filtring Products
// const queryObj = { ...req.query};
// const excludeFields = ["page","sort","limit","fields"];
// excludeFields.forEach((el) => delete queryObj[el]);
// console.log(queryObj);
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gte|lte|lt)\b/g, (match)=> `${match}`);

// let query = Product.find(JSON.parse(queryStr));


// //Sorting

// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   query = query.sort(".createdAt");
// }

// // Limiting the fields

// if(req.query.fields) {
//   const fields = req.query.fields.split(",").join(" ");
//   query = query.select(fields);
// } else {
//   query =query.select('-__v');
// }

// //pagination  

// const page = req.query.page;
// const limit = req.query.limit;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);
// if (req.query.page) {
//   const productCount = await Product.countDocuments();
//   if (skip >= productCount) throw new Error("This page doesn't exists");
// }
// console.log(page, limit, skip);

// const product = await query;
// res.json(product);
// } catch (error) {
//   console.log(error);
//   res.status(400).send({ error: true, error });
// }
// });

// const getAllProducts = asyncHandler(async (req, res, next) => {
//   try {
//     let response = await Product.find();
//     res.status(200).send({ success: true, response });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const { category, title } = req.query; // Get category and name from query parameters

    // Build the query object
    const query = {};

    // If category is provided, add it to the query object
    if (category) {
      query.category = category;
    }

    // If name is provided, add it to the query object as a case-insensitive regular expression
    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    // Use the query object to filter the products
    let response = await Product.find(query);

    res.status(200).send({ success: true, response });
  } catch (error) {
    throw new Error(error);
  }
});


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
    // let body = req.body;
    try {
      
      let newProduct = new Product ({
        title: req.body.title,
        description: req.body.description,
        image: req.imagePath,
        price: req.body.price,
      });
      let response = await newProduct.save();
      res.status(201).send({ success: true, response });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: true, error });
    }
  });

  // update Prduct


const putProduct = async (req, res) => {
  try {
    let update = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.imagePath,
      price: req.body.price,
    };
    const product = await Product.findById(req.params.id);

    // check if the Product does not exist
    if (!product) {
      return res.status(404).json({ status: 404, message: "Product Not Found" });
    }

    // delete the old image
    if (req.body.imagePath) {
      fs.unlinkSync(member.image);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      {
        new: true,
      }
    );

    res.status(200).json({ message: updatedProduct });
  } catch (error) {
    res.json({ err: error.message });
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