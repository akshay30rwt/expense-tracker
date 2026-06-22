const express = require('express');
const router = express.Router();

const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpensesSortedByAmount,
    searchExpensesByTitle
} = require('../controllers/expenseController');

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/search', searchExpensesByTitle);
router.get('/category/:category', getExpensesByCategory);
router.get('/sorted/amount', getExpensesSortedByAmount);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;