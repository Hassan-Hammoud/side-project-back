import express from "express";
const router = express.Router();
import authControllers from "../controllers/userController.js";
// import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
// import logOut from "../middlewares/logOut.js"
router.post("/register", authControllers.createUser);
router.post("/login", authControllers.loginUser);
router.get("/", authControllers.getAllUsers);
// router.get("/:id",authMiddleware.authMiddleware, authControllers.getUser);
router.get("/:id", authMiddleware, isAdmin, authControllers.getUser);
router.put("/:id", authMiddleware,authControllers.putUser);
router.delete("/:id", authControllers.deleteUser);
// router.get("/logout", logOut);
router.put("/block/:id", authMiddleware, isAdmin, authControllers.blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, authControllers.unblockUser);







export default router;
