import express from "express";
const router = express.Router();
import productControllers from "../controllers/productControllers.js";

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProduct);
router.post("/", productControllers.addProduct);
router.put("/:id", productControllers.putProduct);
router.delete("/:id", productControllers.deleteProduct);

export default router;
