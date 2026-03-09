import expenseModel from "../models/expenseModel.js";
import getDateRange from "../utils/dataFilter.js";
import XLSX from "xlsx";

//ADD EXPENSE
export async function addExpense(req, res) {
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const newExpense = new expenseModel({
            userId,
            description,
            amount,
            category,
            date: new Date(date)
        });
        await newExpense.save();
        res.json({
            success: true,
            message: "Expense added successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error creating expense" });
    }
}

//GET ALL EXPENSES

export async function getAllExpenses(req, res) {
    const userId = req.user._id;
    try {
        const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, expenses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching expenses" });
    }


}


//UPDATE EXPENSE

export async function updateExpense(req, res) {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;
    try {
        const updatedExpense = await expenseModel.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        )

        if (!updatedExpense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.json({ success: true, message: "Expense updated successfully!", Expense: updatedExpense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating expense" });
    }
}

//DELETE EXPENSE

export async function deleteExpense(req, res) {
    try {
        const expense = await expenseModel.findByIdAndDelete({ _id: req.params.id });
        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        return res.json({ success: true, message: "Expense deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting expense" });
    }
}

//DOWNLOAD EXPENSES EXCEL

export async function downloadExpensesExcel(req, res) {
    const userId = req.user._id;

    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });
        const plainData = expense.map((exp) => ({
            Description: exp.description,
            Amount: exp.amount,
            Category: exp.category,
            Date: new Date(exp.date).toLocaleDateString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(plainData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "expenseModel");
        XLSX.writeFile(workbook, "expenses.xlsx");
        res.download("expenses.xlsx")

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error downloading expenses" });
    }

}

//GET EXPENSES OVERVIEW

export async function getExpenseOverview(req, res) {
    try {
        const userId = req.user._id;
        const { range = "monthly" } = req.query;
        const { start, end } = getDateRange(range);

        const expenses = await expenseModel.find({ userId, date: { $gte: start, $lte: end } }).sort({ date: -1 });

        const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
        const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;
        const numberOfTransactions = expenses.length;
        const recentTransactions = expenses.slice(0, 5);
        res.json({
            success: true,
            data: {
                totalExpense,
                averageExpense,
                numberOfTransactions,
                recentTransactions,
                range
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching expense overview" });
    }
}