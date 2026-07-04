const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

expenseSchema.index({ category: 1 });
expenseSchema.index({ amount: -1 });
expenseSchema.index({ title: 'text' });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;