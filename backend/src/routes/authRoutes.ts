import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { registerValidation, loginValidation } from "../utils/validators";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", authMiddleware, getProfile);

export default router;
