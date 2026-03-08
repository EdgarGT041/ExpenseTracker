import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { addIncome, getAllIncomes,updateIncome,deleteIncome,getIncomeOverview,downloadIncomesExcel } from '../controllers/incomeController.js';

const incomeRouter = express.Router();

//ROUTES
incomeRouter.post("/add", authMiddleware, addIncome);
incomeRouter.get("/get", authMiddleware, getAllIncomes);
incomeRouter.put("/update/:id", authMiddleware, updateIncome);
incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
incomeRouter.get("/overview", authMiddleware, getIncomeOverview);
incomeRouter.get("/downloadexcel", authMiddleware, downloadIncomesExcel);

export default incomeRouter;