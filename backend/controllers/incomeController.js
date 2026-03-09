import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from "../utils/dataFilter.js";

//add income

export async function addIncome(req, res) {
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const newIncome = new incomeModel({
            userId,
            description,
            amount,
            category,
            date: new Date(date)
        });
        await newIncome.save()
        res.json({
            success: true,
            message: "Income added successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error creating income" });
    }
}

//to get all incomes

export async function getAllIncomes(req, res) {
    const userId = req.user._id;
    try {
        const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, incomes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching incomes" });
    }
}

//update income

export async function updateIncome(req, res) {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;
    try {
        const updatedIncome = await incomeModel.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        )

        if (!updatedIncome) {
            return res.status(404).json({ success: false, message: "Income not found" });
        }
        res.json({ success: true, message: "Income updated successfully!", Income: updatedIncome });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating income" });
    }
}

//delete income
export async function deleteIncome(req, res) {
    try {
        const income = await incomeModel.findByIdAndDelete({ _id: req.params.id });
        if (!income) {
            return res.status(404).json({ success: false, message: "Income not found" });
        }
        return res.json({ success: true, message: "Income deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting income" });
    }
}

//to download all incomes as excel file

export async function downloadIncomesExcel(req, res) {
    const userId = req.user._id;

    try {
        const income = await incomeModel.find({ userId }).sort({ date: -1 });
        const plainData = income.map((inc) => ({
            Description: inc.description,
            Amount: inc.amount,
            Category: inc.category,
            Date: new Date(inc.date).toLocaleDateString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(plainData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "incomeModel");
        XLSX.writeFile(workbook, "incomes.xlsx");
        res.download("incomes.xlsx")

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error downloading incomes" });
    }


}


//to  get income overview

export async function getIncomeOverview(req, res) {
    try {
        const userId = req.user._id;
        const { range = "monthly" } = req.query;
        const { start, end } = getDateRange(range);

        const incomes = await incomeModel.find({ userId, date: { $gte: start, $lte: end } }).sort({ date: -1 });

        const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
        const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
        const numberOfTransactions = incomes.length;
        const recentTransactions = incomes.slice(0, 9);
        res.json({
            success: true,
            data: {
                totalIncome,
                averageIncome,
                numberOfTransactions,
                recentTransactions,
                range
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching income overview" });
    }
}