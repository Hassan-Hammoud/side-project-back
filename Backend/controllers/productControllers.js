  import Product from '../models/productModel.js';
// import fs from "fs";

// callback functions used in Product routes
// get all the Products
// const getAllProducts = (req, res, next) => {
//     Product.find({}, (err, response) => {
//       if (err) return next(err);
//       res.status(200).send({ success: true, response });
//     });
//   };

const getAllProducts = async (req, res, next) => {
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
  
  // Add new Product

  // const addProduct = (req, res, next) =>  {
  //   let body = req.body;
  //   try {
  //     let newProduct = new Product (body);
  //     newProduct.save((err, response) => {
  //       if (err) return next(err);
  //       res.status(201).send({ success: true, response });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).send({ error: true, error });
  //   }
  // }

  const addProduct = async (req, res, next) =>  {
    let body = req.body;
    try {
      let newProduct = new Product (body);
      let response = await newProduct.save();
      res.status(201).send({ success: true, response });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: true, error });
    }
  }



  // update an Product
  
  // const putProduct = async (req, res) => {
  //   let id = req.params.id;
  //   let data = req.body;
  
  //   try {
  //     console.log("data", data);
  //     Product.updateOne({ _id: id }, { $set: data }, (err, response) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.status(200).send({ success: true, response });
  //     });
  //   } catch (error) {
  //     res.status(400).send({ error: true, error });
  //   }
  // };

  const putProduct = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  try {
    console.log("data", data);
    let response = await Product.updateOne({ _id: id }, { $set: data });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};
 
  // Delete an Product
  
  // const deleteProduct = async (req, res, next) => {
  //   let id = req.params.id;
  //   try {
  //     let response = await Product.findByIdAndRemove({ _id: id })
  //       res.status(200).send({ success: true, response });
  //     }
  //    catch (error) {
  //     res.status(400).send({ error: true, error });
  //   }
  // };

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

// const addProduct = (req, res, next) =>  {
//   const Product = req.body.Product;
//   const newProduct = new Product({Product});

//   newProduct.save()
//   .then(() =>res.json("Product added!"))
//   .catch(err =>res.status(400).json("Error:"+err));
// }

// export default addProduct