import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { addExpense, getAllExpenses, updateExpense, deleteExpense, getExpenseOverview, downloadExpensesExcel } from '../controllers/expenseController.js';

const expenseRouter = express.Router();

//ROUTES
expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getAllExpenses);
expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);
expenseRouter.get("/downloadexcel", authMiddleware, downloadExpensesExcel);

export default expenseRouter;