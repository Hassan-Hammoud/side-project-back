import express from "express";
const router = express.Router();
import productControllers from "../controllers/productControllers.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProduct);
router.post("/", authMiddleware, isAdmin,productControllers.addProduct);
router.put("/:id", authMiddleware, isAdmin, productControllers.putProduct);
router.delete("/:id",authMiddleware, isAdmin, productControllers.deleteProduct);

export default router;
