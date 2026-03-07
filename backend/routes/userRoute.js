import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateUser, changePassword } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateUser);
userRouter.put("/password", authMiddleware, changePassword);

export default userRouter;