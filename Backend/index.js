import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import middleware from "./middlewares/errorHandler.js";
dotenv.config();

const PORT = process.env.PORT || 5000; 
await connectDB();
const app = new express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const express = require("express");
// const app = express();
// const server = app.listen(0, () => {
//   const port = server.address().port;
//   console.log(`Server is running on port ${port}`);
// });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); 

app.use('/api/user',authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);

// const server = app.listen(3000, () => {
//   const port = server.address().port;
//   console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
// }); 
