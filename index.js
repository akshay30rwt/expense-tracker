const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/expenses', expenseRoutes);
app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Connection failed', error);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});