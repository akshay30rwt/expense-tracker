const Expense = require('../models/Expense');
const AppError = require('../utils/AppError');

const createExpense = async (req, res, next) => {
    try {
        const { title, amount, category } = req.body;
        
        const expense = new Expense({ title, amount, category });
        await expense.save();

        res.status(201).json(expense);
    }
    catch(error) {
        next(error);
    }
}

const getAllExpenses = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const expenses = await Expense.find().skip(skip).limit(limit);

        const total = await Expense.countDocuments();

        return res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total/limit),
            data: expenses
        });
    }
    catch(error) {
        next(error);
    }
}

const getExpenseById = async (req, res, next) => {
    try {
        const expenseId = req.params.id;

        const expense = await Expense.findById(expenseId);
        if(expense === null) {
            throw new AppError('Expense not found', 404);
        }
        res.status(200).json(expense);
    }
    catch(error) {
        next(error);
    }
}

const updateExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const { title, amount, category } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, { title, amount, category }, { new: true, runValidators: true });
        if(updatedExpense === null) {
            throw new AppError('Expense not found', 404);
        }
        res.status(200).json(updatedExpense);
    }
    catch(error) {
        next(error);
    }
}

const deleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;

        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if(deletedExpense === null) {
            throw new AppError('Expense not found', 404);
        }
        res.status(200).json({ message: `Expense ${deletedExpense.title} deleted successfully` });
    }
    catch(error) {
        next(error);
    }
}

const getExpensesByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;

        const expenses = await Expense.find({ category: category });
        res.status(200).json(expenses);
    }
    catch(error) {
        next(error);
    }
};

const getExpensesSortedByAmount = async (req, res, next) => {
    try {
        const expenses = await Expense.find().sort({ amount: -1 });
        res.status(200).json(expenses);
    }
    catch(error) {
        next(error);
    }
};

const searchExpensesByTitle = async (req, res, next) => {
    try {
        const { title } = req.query;

        const expenses = await Expense.find({
            title: { $regex: title, $options: 'i' }
        });
        res.status(200).json(expenses);
    }
    catch(error) {
        next(error);
    }
};

const getCategoryReport = async (req, res, next) => {
    try {
        const summary = await Expense.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 },
                    averageAmount: { $avg: '$amount' }
                }
            },
            {
                $sort: { totalAmount: -1 }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    totalAmount: 1,
                    count: 1,
                    averageAmount: { $round: ['$averageAmount', 2] }
                }
            }
        ]);

        res.status(200).json(summary);
    }
    catch(error) {
        next(error);
    }
}

const getMonthlyReport = async (req, res, next) => {
    try {
        const { year } = req.query;

        const report = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$date' },
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id',
                    totalAmount: 1,
                    count: 1
                }
            }
        ]);

        return res.status(200).json(report);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpensesSortedByAmount,
    searchExpensesByTitle,
    getCategoryReport,
    getMonthlyReport
}