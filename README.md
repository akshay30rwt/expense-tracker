# Expense Tracker API

A REST API to manage expenses built with Node.js, Express.js and MongoDB.
Includes Joi validation and global error handling.

## Features
- Full CRUD for expenses
- Filter by category
- Sort by amount
- Search by title
- Request validation with Joi
- Global error handling

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /expenses               - Create an expense
- GET    /expenses               - Get all expenses
- GET    /expenses/:id           - Get an expense by ID
- PUT    /expenses/:id           - Update an expense
- DELETE /expenses/:id           - Delete an expense
- GET    /expenses/search?title  - Search by title
- GET    /expenses/filter/:cat   - Filter by category
- GET    /expenses/sorted/amount - Sort by amount