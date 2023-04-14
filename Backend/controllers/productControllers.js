import slugify from 'slugify';
import Product from '../models/productModel.js';
// import fs from "fs";
import asyncHandler from "express-async-handler";
// Get All Products

const getAllProducts = asyncHandler(async (req, res) => {
  try {

// Filtring Products
const queryObj = { ...req.query};
const excludeFields = ["page","sort","limit","fields"];
excludeFields.forEach((el) => delete queryObj[el]);
console.log(queryObj);
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gte|lte|lt)\b/g, (match)=> `${match}`);

let query = Product.find(JSON.parse(queryStr));


//Sorting

if (req.query.sort) {
  const sortBy = req.query.sort.split(',').join(' ');
  query = query.sort(sortBy);
} else {
  query = query.sort(".createdAt");
}

// Limiting the fields

if(req.query.fields) {
  const fields = req.query.fields.split(",").join(" ");
  query = query.select(fields);
} else {
  query =query.select('-__v');
}

//pagination  

const page = req.query.page;
const limit = req.query.limit;
const skip = (page - 1) * limit;
query = query.skip(skip).limit(limit);
if (req.query.page) {
  const productCount = await Product.countDocuments();
  if (skip >= productCount) throw new Error("This page doesn't exists");
}
console.log(page, limit, skip);

const product = await query;
res.json(product);
} catch (error) {
  console.log(error);
  res.status(400).send({ error: true, error });
}
});
    //  let response = await Product.find(req.query);
    // res.status(200).send({ success: true, response });


// const getAllProducts = asyncHandler(async (req, res) => {
//   try {
//     // Filtering Products
//     const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);
//     console.log(queryObj);

//     // Update queryObj to use $gte and $lte operators
//     const { price } = queryObj;
//     if (price && price.gte) {
//       queryObj.price.$gte = price.gte;
//       delete queryObj.price.gte;
//     }
//     if (price && price.lte) {
//       queryObj.price.$lte = price.lte;
//       delete queryObj.price.lte;
//     }

//     const query = Product.find(queryObj);
//     const product = await query;
//     res.json(product);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: true, error });
//   }
// });



  
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