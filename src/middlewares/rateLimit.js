const rateLimit = require("express-rate-limit");
const response = require('../utils/responses');
const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    handler: (req, res) => {
        response.TooManyRequest(res);
    }
});
exports.rateLimits = (app) => {
    app.use(rateLimiter);
}