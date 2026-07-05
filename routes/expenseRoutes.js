const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { expenseSchema } = require('../validators/expenseValidator');

const {
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
} = require('../controllers/expenseController');

router.post('/', validate(expenseSchema), createExpense);
router.get('/', getAllExpenses);
router.get('/search', searchExpensesByTitle);
router.get('/category/:category', getExpensesByCategory);
router.get('/sorted/amount', getExpensesSortedByAmount);
router.get('/summary/category', getCategoryReport);
router.get('/summary/monthly', getMonthlyReport);
router.get('/:id', getExpenseById);
router.put('/:id', validate(expenseSchema), updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;