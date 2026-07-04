const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const message = err.message || 'Internal server error';
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message, 
        status: statusCode
    });
}

module.exports = errorHandler;