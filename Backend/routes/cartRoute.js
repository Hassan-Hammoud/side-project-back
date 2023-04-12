import express from "express";
const router = express.Router();
import cartControllers from "../controllers/cartController.js";

router.get("/", cartControllers.getAllCarts);
router.get("/:id", cartControllers.getCart);
router.post("/", cartControllers.addCart);
router.put("/:id", cartControllers.putCart);
router.delete("/:id", cartControllers.deleteCart);

export default router;
