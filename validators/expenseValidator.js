const Joi = require('joi');

const expenseSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    amount: Joi.number().min(0).required(),
    category: Joi.string().valid('Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Other').required(),
    date: Joi.date()
});

module.exports = { expenseSchema };