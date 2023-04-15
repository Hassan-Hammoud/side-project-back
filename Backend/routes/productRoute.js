import express from "express";
const router = express.Router();
import productControllers from "../controllers/productControllers.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import imageHandler from "../middlewares/imageHandler.js";

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProduct);
router.post("/", authMiddleware, isAdmin,imageHandler,productControllers.addProduct);
router.put("/:id", authMiddleware, isAdmin, imageHandler, productControllers.putProduct);
router.delete("/:id",authMiddleware, isAdmin, productControllers.deleteProduct);

export default router;
