const Expense = require('../models/Expense');

const createExpense = async (req, res) => {
    const { title, amount, category } = req.body;
    
    const expense = new Expense({ title, amount, category });
    await expense.save();

    res.status(201).json(expense);
}

const getAllExpenses = async (req, res) => {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
}

const getExpenseById = async (req, res) => {
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);
    if(expense === null) {
        res.status(404).json({ message: 'Expense not found'} );
        return;
    }
    res.status(200).json(expense);
}

const updateExpense = async (req, res) => {
    const expenseId = req.params.id;
    const { title, amount, category } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, { title, amount, category }, { new: true });
    if(updateExpense === null) {
        res.status(404).json({ message: 'Expense not found'} );
        return;
    }
    res.status(200).json(updatedExpense);
}

const deleteExpense = async (req, res) => {
    const expenseId = req.params.id;

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if(deletedExpense === null) {
        res.status(404).json({ message: 'Expense not found'} );
        return;
    }
    res.status(200).json({ message: `Expense ${deletedExpense.title} deleted successfully` });
}

const getExpensesByCategory = async (req, res) => {
    const { category } = req.params;

    const expenses = await Expense.find({ category: category });
    res.status(200).json(expenses);
};

const getExpensesSortedByAmount = async (req, res) => {
    const expenses = await Expense.find().sort({ amount: -1 });
    res.status(200).json(expenses);
};

const searchExpensesByTitle = async (req, res) => {
    const { title } = req.query;

    const expenses = await Expense.find({
        title: { $regex: title, $options: 'i' }
    });
    res.status(200).json(expenses);
};

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpensesSortedByAmount,
    searchExpensesByTitle
}