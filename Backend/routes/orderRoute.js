import express from "express";
const router = express.Router();
import orderControllers from "../controllers/orderController.js";

router.get("/", orderControllers.getAllOrders);
router.get("/:id", orderControllers.getOrder);
router.post("/", orderControllers.addOrder);
router.put("/:id", orderControllers.putOrder);
router.delete("/:id", orderControllers.deleteOrder);

export default router;
