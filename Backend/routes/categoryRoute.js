import express from "express";
const router = express.Router();
import categoryControllers from "../controllers/categoryController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

router.get("/", categoryControllers.getAllCategories);
router.get("/:id", categoryControllers.getCategory);
router.post("/", authMiddleware, isAdmin, categoryControllers.addCategory);
router.put("/:id", authMiddleware, isAdmin, categoryControllers.putCategory);
router.delete("/:id",authMiddleware,isAdmin,categoryControllers.deleteCategory);

export default router;
