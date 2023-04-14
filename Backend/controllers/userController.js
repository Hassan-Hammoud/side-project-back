import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwtToken from "../config/jwtToken.js"
import validateMongoDB from "../utils/validateMongoDB.js";
// Register the user 

const createUser = asyncHandler (async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if (!findUser) {
        // create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error ("User already exists");
    }
});

// Login the user

const loginUser = asyncHandler ( async (req, res) => {
    const {email, password} = req.body;
    
    // Check if the user already exists

    const findUser = await User.findOne ({email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
          _id: findUser._id,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email: findUser.email,
          mobile: findUser.mobile,
          token: jwtToken.generateToken(findUser?._id),
        });
    } else {
        throw new Error ("Invalid Credentials")
    }
});

// Get all the users

const getAllUsers = asyncHandler (async (req, res, next) => {
  try {
    let response = await User.find();
    res.status(200).send({ success: true, response });
  } catch (error) {
        throw new Error(error)
  }
});


  // Get a user by id
  
  const getUser = asyncHandler(async (req, res, next) => {
      try {
        let { id } = req.params;
        validateMongoDB(id);
      let response = await User.findOne({ _id:id});
      res.status(200).send({ success: true, response:response }); 
      } catch (error) {
            throw new Error(error);
      }

});

// Update User

const putUser = asyncHandler (async (req, res) => {
  const {_id} = req.user;
  validateMongoDB(_id);

  try {
    const putUser = await User.findByIdAndUpdate(
      _id,
      {firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,},
      {
        new: true,
      }
    );
    res.json(putUser);
  } catch (error) {
    throw new Error(error);
  }
})


// delete user

const deleteUser = asyncHandler ( async (req, res, next) => {
  let id = req.params.id;
  try {
    let response = await User.findByIdAndRemove({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
        throw new Error(error);
        
  }
});

// Block a User

const blockUser = asyncHandler (async (req, res) => {
  const {id} = req.params;
  validateMongoDB(id);
  try{
    const blockuser = await User.findByIdAndUpdate(
      id,
    { isBlocked:true,
  },
  {
    new:true,
  }
    );
    res.json(blockuser);
} catch (error) {
  throw new Error(error);
}
});

// UnBlock a User

const unblockUser = asyncHandler (async (req, res) => {
  const {id} = req.params;
  validateMongoDB(id);
  try{
    const unblockuser =  await User.findByIdAndUpdate(
      id,
    { isBlocked:false,
  },
  {
    new:true,
  }
    );
    res.json(unblockuser);
} catch (error) {
  throw new Error(error);
}
});

    export default {
      createUser,
      loginUser,
      getAllUsers,
      getUser,
      putUser,
      deleteUser,
      blockUser,
      unblockUser,
    };