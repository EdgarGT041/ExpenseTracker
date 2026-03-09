import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getDashboardOverview } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

//ROUTES
dashboardRouter.get("/", authMiddleware, getDashboardOverview);

export default dashboardRouter;