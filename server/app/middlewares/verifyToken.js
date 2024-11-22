const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Get request header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next({ status: 401, 
            message: "Authentication failed...", 
            warning: `Unauthorized access attempt: ${req.ip}`,
        });
    }
    // Split the header delimiting by a blank space, get the second argument ([1]), and save to const token
    // This will get the token part of the header
    const token = authHeader.split(" ")[1]; 
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            return next({ status: 401, message: "Token expired..." });
        }
        if (err) {
            return next({ status: 403, 
                message: "Invalid token...",
                warning: `Invalid token attempt: ${req.ip}`,
            });
        }
        req.user = user;
        next(); 
    });
};

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);

        if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
            return next();
        } else {
            return next({ status: 403, message: "Not permitted..." });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);

        if (req.user && req.user.isAdmin) {
            return next();
        } else {
            return next({ status: 403, message: "Not permitted..." });
        }
    });
};

module.exports = { 
    verifyToken, 
    verifyTokenAndAuth, 
    verifyTokenAndAdmin 
};