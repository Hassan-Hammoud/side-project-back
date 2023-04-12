import express from "express";
const router = express.Router();
import authControllers from "../controllers/userController.js";
// import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

router.post("/register", authControllers.createUser);
router.post("/login", authControllers.loginUser);
router.get("/", authControllers.getAllUsers);
// router.get("/:id",authMiddleware.authMiddleware, authControllers.getUser);
router.get("/:id", authMiddleware, isAdmin, authControllers.getUser);
router.put("/:id", authControllers.putUser);
router.delete("/:id", authControllers.deleteUser);






export default router;
