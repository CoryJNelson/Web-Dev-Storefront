const errorHandler = (err, req, res, next) => {
    // for development
    if (err.ogError) {
        console.error(err.ogError);
        console.log(err.message);
    };

    if (err.warning) {
        console.warn(err.warning);
    }
    
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    // Send error response to client
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message,
        },
    });
};

module.exports = errorHandler;